function App() {
  return (
    <div className="container w-50 text-center">
      <h1>Shorten your link!</h1>
      <form>
        <input
          type="text"
          placeholder="Enter your link"
          className="form-control mt-3"
        />
        <button type="submit" className="btn btn-primary mt-3">
          Shorten!
        </button>
      </form>
    </div>
  );
}

export default App;
