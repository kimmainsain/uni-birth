import React, { useState } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { SEARTCH_LIST } from "../../constants/constants";
import Search from "../../assets/icons/js/search";
import CustomDropdown from "../atoms/CustomDropdown";
import CustomAlert from "../atoms/CustomAlert";

const SearchHeader = ({ buttons, category, setCategory, query, setQuery }) => {
  const { navigateToSearchCommon } = useNavigation();
  const [isAlertVisible, setIsAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSearchInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearch = () => {
    if (query === "") {
      setIsAlertVisible(true);
      setAlertMessage("검색어를 입력해주세요.");
      return;
    }
    navigateToSearchCommon(query, category);
  };

  const handleCategoryChange = (newCategory) => {
    setCategory(newCategory);
    // 새 카테고리로 쿼리를 실행하는 로직을 여기에 추가
  };

  return (
    <div className="flex justify-between space-x-4 px-2 py-4">
      <CustomAlert
        message={alertMessage}
        isVisible={isAlertVisible}
        onClose={() => {
          setIsAlertVisible(false);
        }}
      />
      <div className="flex items-center">
        {buttons &&
          buttons.map((button, index) => {
            const ButtonComponent = button.component;
            return (
              <ButtonComponent
                key={index}
                className="w-10 font-Pretendard"
                value={button.value}
                onClick={button.onClick}
                icon={button.icon}
              />
            );
          })}
      </div>
      <div className="flex flex-grow"></div>
      <div className="flex items-center justify-end space-x-4 px-2">
        <input
          className="w-1/2 border-b bg-transparent font-Pretendard text-white"
          type="text"
          placeholder={query}
          value={query}
          onChange={handleSearchInputChange}
        />
        <div className="flex flex-col items-center justify-center rounded-lg border-double bg-transparent font-Pretendard">
          <CustomDropdown
            value={category}
            onChange={handleCategoryChange}
            searchList={SEARTCH_LIST}
          />
        </div>
        <button className="font-Pretendard" onClick={handleSearch}>
          <Search />
        </button>
      </div>
    </div>
  );
};

export default SearchHeader;
