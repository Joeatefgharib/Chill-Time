const Genre = ({ genre }) => {
  return (
    <span
      className={
        " bg-white text-black pt-[0.25em] pb-[0.25em] pr-[0.4em] pl-[0.4em] border-r-2 border-solid border-white rounded-xl font-bold ml-3"
      }
    >
      {genre}
    </span>
  );
};

export default Genre;
