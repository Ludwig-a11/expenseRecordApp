// Verificación manual de firestore.rules contra el emulador local.
// Requiere el emulador de Firestore corriendo en 127.0.0.1:8080 (ver firebase.json).
// Uso:
//   npx firebase emulators:exec --only firestore "npm run verify:rules"
// o, en dos terminales:
//   npx firebase emulators:start --only firestore
//   npm run verify:rules

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import assert from 'node:assert/strict';
import {
  initializeTestEnvironment,
  assertFails,
  assertSucceeds,
} from '@firebase/rules-unit-testing';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
} from 'firebase/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));
const rules = readFileSync(join(__dirname, '..', 'firestore.rules'), 'utf8');

const USER_A = 'userA';
const USER_B = 'userB';

const validExpense = (uid, overrides = {}) => ({
  category: 'Home',
  description: 'Weekly groceries',
  amount: 42.5,
  date: 1700000000,
  uidUser: uid,
  ...overrides,
});

let testEnv;
let passed = 0;
let failed = 0;

const test = async (name, fn) => {
  try {
    await fn();
    passed += 1;
    console.log(`  ✓ ${name}`);
  } catch (error) {
    failed += 1;
    console.error(`  ✗ ${name}`);
    console.error(`    ${error.message}`);
  }
};

const seedExpense = async (id, data) => {
  await testEnv.withSecurityRulesDisabled(async (context) => {
    await setDoc(doc(context.firestore(), 'expenses', id), data);
  });
};

const run = async () => {
  testEnv = await initializeTestEnvironment({
    projectId: 'demo-expense-record-app',
    firestore: {
      rules,
      host: '127.0.0.1',
      port: 8080,
    },
  });

  await seedExpense('expenseA1', validExpense(USER_A));

  const a = testEnv.authenticatedContext(USER_A).firestore();
  const b = testEnv.authenticatedContext(USER_B).firestore();
  const anon = testEnv.unauthenticatedContext().firestore();

  console.log('\nOwnership — read/update/delete');
  await test('B no puede leer el gasto de A', async () => {
    await assertFails(getDoc(doc(b, 'expenses', 'expenseA1')));
  });
  await test('A sí puede leer su propio gasto', async () => {
    await assertSucceeds(getDoc(doc(a, 'expenses', 'expenseA1')));
  });
  await test('B no puede editar el gasto de A', async () => {
    await assertFails(updateDoc(doc(b, 'expenses', 'expenseA1'), { amount: 999 }));
  });
  await test('A sí puede editar su propio gasto', async () => {
    await assertSucceeds(updateDoc(doc(a, 'expenses', 'expenseA1'), { amount: 50 }));
  });
  await test('B no puede borrar el gasto de A', async () => {
    await assertFails(deleteDoc(doc(b, 'expenses', 'expenseA1')));
  });
  await test('usuario no autenticado no puede leer ningún gasto', async () => {
    await assertFails(getDoc(doc(anon, 'expenses', 'expenseA1')));
  });

  console.log('\nValidación de forma en create');
  await test('create con amount <= 0 es rechazado', async () => {
    await assertFails(
      setDoc(doc(a, 'expenses', 'bad-amount'), validExpense(USER_A, { amount: -5 }))
    );
  });
  await test('create sin description es rechazado', async () => {
    const data = validExpense(USER_A);
    delete data.description;
    await assertFails(setDoc(doc(a, 'expenses', 'bad-shape'), data));
  });
  await test('create con campo extra no contemplado es rechazado', async () => {
    await assertFails(
      setDoc(
        doc(a, 'expenses', 'bad-extra-field'),
        validExpense(USER_A, { note: 'no debería existir' })
      )
    );
  });
  await test('create con uidUser distinto al auth.uid es rechazado', async () => {
    await assertFails(setDoc(doc(a, 'expenses', 'bad-uid'), validExpense(USER_B)));
  });
  await test('create válido de A es aceptado', async () => {
    await assertSucceeds(
      setDoc(doc(a, 'expenses', 'goodA2'), validExpense(USER_A, { description: 'Second expense' }))
    );
  });

  console.log('\nQueries filtradas (patrón useGetExpenses / useGetMonthlyExpenses)');
  await seedExpense('expenseB1', validExpense(USER_B));

  await test('query de A filtrada por su propio uidUser funciona (useGetExpenses)', async () => {
    const q = query(collection(a, 'expenses'), where('uidUser', '==', USER_A), orderBy('date', 'desc'));
    const snapshot = await assertSucceeds(getDocs(q));
    assert.ok(snapshot.docs.every((d) => d.data().uidUser === USER_A));
  });

  await test('query de A con rango de fechas + uidUser funciona (useGetMonthlyExpenses)', async () => {
    const q = query(
      collection(a, 'expenses'),
      orderBy('date', 'desc'),
      where('date', '>=', 1699999999),
      where('date', '<=', 1700000001),
      where('uidUser', '==', USER_A)
    );
    const snapshot = await assertSucceeds(getDocs(q));
    assert.ok(snapshot.docs.length > 0);
  });

  await test('query de A sin filtro de uidUser es rechazada (podría exponer gastos de B)', async () => {
    const q = query(collection(a, 'expenses'));
    await assertFails(getDocs(q));
  });

  await test('query de A intentando leer los gastos de B es rechazada', async () => {
    const q = query(collection(a, 'expenses'), where('uidUser', '==', USER_B));
    await assertFails(getDocs(q));
  });

  await testEnv.cleanup();

  console.log(`\n${passed} pasaron, ${failed} fallaron`);
  process.exit(failed > 0 ? 1 : 0);
};

run().catch((error) => {
  console.error('Error ejecutando la verificación:', error);
  process.exit(1);
});
