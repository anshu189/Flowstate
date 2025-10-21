const Itemlist = ({ data }) => {
  console.log(data);
  return (
    <ul className="px-6 list-decimal">
      {data.map((e, i) => (
        <li key={i}>{e}</li>
      ))}
    </ul>
  );
};

export default Itemlist;
