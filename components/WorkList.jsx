import "@/styles/WorkList.scss"
import { motion } from "framer-motion";
import WorkCard from "./WorkCard"

const WorkList = ({ data }) => {
  return (
    <div className="work-list">
      {data.map((work, index) => (
        <motion.div
          key={work._id}
          initial={{ opacity: 0, y: 10, scale: 0.9, x: 10}} 
          animate={{ opacity: 1, y: 0 , scale: 1, x: 0}} 
          transition={{ duration: 0.5, delay: index * 0.08 }} 
        >
          <WorkCard work={work} />
        </motion.div>
      ))}
    </div>
  );
}

export default WorkList