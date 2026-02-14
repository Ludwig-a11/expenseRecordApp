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
    { id: "food", text: "Food" },
    { id: "accounts and payments", text: "Accounts and Payments" },
    { id: "home", text: "Home" },
    { id: "transport", text: "Transport" },
    { id: "clothing", text: "Clothing" },
    { id: "health and hygiene", text: "Health and Hygiene" },
    { id: "shopping", text: "Shopping" },
    { id: "fun", text: "Fun" },
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
