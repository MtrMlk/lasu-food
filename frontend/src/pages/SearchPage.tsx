import { useParams } from "react-router-dom";

const SearchPage = () => {
  const { campus } = useParams();

  return <span>User Searched For {campus}</span>;
};

export default SearchPage;
