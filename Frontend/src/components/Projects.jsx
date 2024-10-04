import { FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Projects = () => {
  const [projectDetails, setProjectDetails] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchProjectDetails = async () => {
      try {
        const response = await fetch('https://portfolio-backend-dsd6.onrender.com/api/allprojects'); // Your API endpoint
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setProjectDetails(data);
      } catch (error) {
        console.error('Error fetching projects:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };
    fetchProjectDetails();
  }, []);

  // Animation variants for smooth transitions
  const cardVariants = {
    hidden: { opacity: 0, scale: 1 },
    visible: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  };

  // Placeholder component for loading state
  const LoadingPlaceholder = () => (
    <motion.div
      className="bg-transparent border border-white rounded-xl p-5 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)]"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      transition={{ duration: 0.1 }}
    >
      <div className="h-32 w-full bg-transparent rounded-lg mb-4 animate-pulse"></div>
      <div className="h-4 bg-transparent rounded mb-2 animate-pulse"></div>
      <div className="h-4 bg-transparent rounded animate-pulse"></div>
    </motion.div>
  );

  return (
    <motion.section className="text-white bg-custom-bg mx-4 sm:mx-8 md:mx-16 lg:mx-32 my-10 rounded-3xl p-6 md:p-10 flex flex-col">
      {/* Heading */}
      <motion.div className="text-center mb-12">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">Works & Projects</h1>
        <p className="text-gray-400 text-base px-2 sm:px-8 md:px-24 lg:px-72">
          Check out some of my design projects, meticulously crafted with love and dedication, each one reflecting the passion and soul I poured into every detail.
        </p>
      </motion.div>

      {/* Projects Grid */}
      <motion.div className="flex flex-wrap justify-center gap-4">
        {loading
          ? Array.from({ length: 3 }, (_, index) => <LoadingPlaceholder key={index} />) // Show placeholders while loading
          : projectDetails.length > 0 ? (
              projectDetails.map((project) => (
                <motion.div
                  key={project._id}
                  variants={cardVariants} // Apply animation variants
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  transition={{ duration: 0.1 }} // Control the animation duration
                  className="bg-transparent border border-white rounded-xl p-5 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)] group relative overflow-hidden"
                >
                  <img
                    src={`https://portfolio-backend-dsd6.onrender.com${project.imageUrls[0]}`}
                    alt={project.projectName}
                    className="w-full rounded-lg object-cover mb-4 transition duration-300 ease-in-out group-hover:blur-sm"
                  />
                  <p className="text-gray-500">{project.techUsed.join(', ')}</p>
                  <h3 className="text-lg font-semibold text-white">{project.projectName}</h3>

                  {/* Live Demo Link */}
                  {project.liveLink && (
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-500 underline mt-2 block z-10 relative" // Added z-index
                    >
                      Live Demo
                    </a>
                  )}

                  {/* Overlay Icon for GitHub Link */}
                  <a
                    href={project.githubLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out bg-black bg-opacity-50"
                    style={{ zIndex: 1 }} // Lower z-index to ensure the link is clickable
                  >
                    <FaGithub className="text-white text-4xl" />
                  </a>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400">Loading......</p> // Message if no projects are found
            )}
      </motion.div>
    </motion.section>
  );
};

export default Projects;
