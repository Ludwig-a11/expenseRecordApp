import { useState } from "react";
import PropTypes from "prop-types";
import {
  SelectContainer,
  SelectedOption,
  Options,
  Option,
} from "./../elements/SelectCategories";

const SelectCategories = ({ category, setCategory }) => {
  const [showSelect, setShowSelect] = useState(false);

  const categories = [
    { id: "Food", text: "Food" },
    { id: "Accounts and Payments", text: "Accounts and Payments" },
    { id: "Home", text: "Home" },
    { id: "Transport", text: "Transport" },
    { id: "Clothing", text: "Clothing" },
    { id: "Health and Hygiene", text: "Health and Hygiene" },
    { id: "Shopping", text: "Shopping" },
    { id: "Fun", text: "Fun" },
  ];

  const handleClick = (e) => {
    setCategory(e.currentTarget.dataset.value);
  }


  return (
    <SelectContainer onClick={() => setShowSelect(!showSelect)}>
      <SelectedOption>
        {category}
      </SelectedOption>
      {showSelect && (
        <Options>
          {categories.map((category) => {
            return <Option 
                      key={category.id}
                      data-value={category.id}
                      onClick={handleClick}
                    >
                      {category.text}
                    </Option>;
          })}
        </Options>
      )}
    </SelectContainer>
  );
};

SelectCategories.propTypes = {
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
};

export default SelectCategories;
