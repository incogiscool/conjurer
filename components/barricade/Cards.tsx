type CardsType = {
  header: string;
  text: string;
};

const Cards = ({ header, text }: CardsType) => {
  return (
    <div className="bg-buttonBackgroundAlt text-white m-5 max-w-xl p-5 rounded-xl shadow-lg">
      <p className="text-2xl mb-3 font-medium">{header}</p>
      <p>{text}</p>
    </div>
  );
};

export default Cards;
