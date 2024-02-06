import { ChangeEvent, useState } from "react";
import axiosApi from "./axiosApi";
import { apiURL } from "./constants";

function App() {
  const [inputValue, setInputValue] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [showText, setShowText] = useState(false);
  const [visibleShort, setVisibleShort] = useState("");

  const onFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      url: inputValue,
    };
    console.log(data);
    try {
      const response = await axiosApi.post("links", data);
      setShortUrl(response.data.shortUrl);
      setVisibleShort(apiURL + "/" + response.data.shortUrl);
    } catch (e) {
      console.error(e);
    }

    if (!showText) {
      setShowText(true);
    }
  };

  const redirectHandle = async (event: React.MouseEvent) => {
    event?.preventDefault();
    await axiosApi.get(`/${shortUrl}`);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  return (
    <div className="container w-50 text-center">
      <h1>Shorten your link!</h1>
      <form onSubmit={onFormSubmit}>
        <input
          type="text"
          placeholder="Enter your link"
          className="form-control mt-3"
          value={inputValue}
          onChange={handleChange}
        />
        <button type="submit" className="btn btn-primary mt-3">
          Shorten!
        </button>
      </form>
      {showText && <h3>Your link now looks like this:</h3>}
      {shortUrl && (
        <a className="btn btn-danger" href="#" onClick={redirectHandle}>
          {visibleShort}
        </a>
      )}
    </div>
  );
}

export default App;
