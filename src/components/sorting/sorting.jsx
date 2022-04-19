import React, {useMemo} from "react";
import {connect} from "react-redux";
import {useHistory} from "react-router-dom";
import {sortingDropDown} from "../store/sort-drop-down/selectors";
import {changeSortDropDown} from "../store/action";

const Sorting = ({option, dropDown, onDropDown}) => {
  const router = useHistory();
  const newUrl = useMemo(() => {
    return `${router.location.pathname}?option=${option}`;
  }, [router.location.pathname, option]);

  const onClickItem = () => {
    router.push(newUrl);
    onDropDown(dropDown);
  };

  return (
    <li className="places__option" tabIndex="0"
      onClick={() => onClickItem()}>{option}</li>
  );
};

const mapStateToProps = (state) => ({
  dropDown: sortingDropDown(state),
});

const mapDispatchToProps = (dispatch) => ({
  onDropDown(dropDown) {
    dispatch(changeSortDropDown(!dropDown));
  },
});

export {Sorting};
export default connect(mapStateToProps, mapDispatchToProps)(Sorting);

