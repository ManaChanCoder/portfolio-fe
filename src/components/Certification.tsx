import "./component.css";
interface CertificationProps {
  img: string;
  title: string;
  content: string;
}
const Certification = ({ img, title, content }: CertificationProps) => {
  return (
    <div className="cert-card-sizes rounded-2">
      <img src={img} alt={title} className="cert-sizes" />
      <div className="">
        <h1 className="fs-3 mt-4 mb-2">{title}</h1>
        <p className="opacity-75">{content}</p>
      </div>
    </div>
  );
};

export default Certification;
