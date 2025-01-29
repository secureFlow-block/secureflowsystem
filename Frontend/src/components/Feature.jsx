import PropTypes from "prop-types";

const Feature = ({ icon, title, description }) => (
  <div className="p-8 bg-lightGray/50 rounded-2xl hover:-translate-y-1 transition duration-500 shadow-lg hover:shadow-white">
    {icon}
    <h3 className="text-xl font-bold mb-4 text-secondary">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);
Feature.propTypes = {
  icon: PropTypes.node.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};

export default Feature;
