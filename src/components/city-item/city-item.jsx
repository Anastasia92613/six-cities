import React, {useMemo} from "react";
import {Link, useParams} from "react-router-dom";
import {useQuery} from "../../hooks";

const CityItem = ({city}) => {
  const {activeCity} = useParams();

  const query = useQuery();

  const option = useMemo(() => {
    return query.get(`option`) || `Popular`;
  }, [query]);

  const link = {
    pathname: `/${city}`,
    search: `option=${option}`,
  };

  return (
    <li className="locations__item">
      <Link to={link} className={`locations__item-link tabs__item ${activeCity === city ? `tabs__item--active` : ``}` }>
        <span>{city}</span>
      </Link>
    </li>
  );
};


export default CityItem;


