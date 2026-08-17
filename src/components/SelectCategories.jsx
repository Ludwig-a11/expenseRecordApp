import { useState } from "react";
import PropTypes from "prop-types";
import {
  SelectContainer,
  SelectedOption,
  Options,
  Option,
} from "./../elements/SelectCategories";
import { CATEGORY_LABELS_ES, getCategoryLabel } from "./../functions/categoryLabels";

const SelectCategories = ({ category, setCategory }) => {
  const [showSelect, setShowSelect] = useState(false);

  const categories = Object.entries(CATEGORY_LABELS_ES).map(([id, text]) => ({ id, text }));

  const handleClick = (e) => {
    setCategory(e.currentTarget.dataset.value);
  }


  return (
    <SelectContainer onClick={() => setShowSelect(!showSelect)}>
      <SelectedOption>
        {getCategoryLabel(category)}
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
