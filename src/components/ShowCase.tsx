import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";

const ShowCase = () => {
  return (
    <div className="showcase-contact p-4 rounded-3 shadow-sm h-100 d-flex flex-column gap-3 align-items-start">
      <div className="d-flex align-items-center gap-3">
        <FaMapMarkerAlt size={20} />
        <div>
          <strong>Address:</strong>
          <div className="">Kasiglahan rd, Brgy san jose</div>
          <div>Rodriguez Rizal (1860)</div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-3">
        <FaPhoneAlt size={20} />
        <div>
          <strong>Phone:</strong>
          <div>0992-335-8395</div>
        </div>
      </div>
      <div className="d-flex align-items-center gap-3">
        <FaEnvelope size={20} />
        <div>
          <strong>Email:</strong>
          <div>sainggarhogenn@gmail.com</div>
        </div>
      </div>
    </div>
  );
};

export default ShowCase;
