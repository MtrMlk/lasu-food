import landingImage from "../assets/landing.png";
import appDownloadImage from "../assets/appDownload.png";
import SearchBar, { type SearchForm } from "@/components/SearchBar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    });
  };
  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-purple-600">
          Tap For Treats, Today!
        </h1>
        <span className="text-xl text-gray-700">
          Food Is Just A Click Away!
        </span>
        <SearchBar
          placeHolder="Search by Campus"
          onSubmit={handleSearchSubmit}
        />
      </div>
      <div className="grid md:grid-cols-2 gap-5">
        <img src={landingImage} alt="Landing Image" />
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Order Takeaway Even Faster!
          </span>
          <span className="text-gray-700">
            {" "}
            Download The LASU Food app For Faster Ordering Within LASU
          </span>
          <img src={appDownloadImage} alt="App Download Image" />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
