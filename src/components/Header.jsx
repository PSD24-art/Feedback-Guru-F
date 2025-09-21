const Header = () => {
  return (
    <>
      <div className=" fixed min-w-full h-13 flex justify-between items-center">
        <div className="p-1 h-8 flex flex-row ms-2">Logo</div>
        <div className="w-auto flex h-10 me-2">
          <button>Profile</button>
        </div>
      </div>
    </>
  );
};

export default Header;
