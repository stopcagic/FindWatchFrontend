import "./listItem.scss";

export default function ListItem({ id, name, image }) {
  return (
    <div className="listItem">
      <img src={image} alt={name} />
    </div>
  );
}
