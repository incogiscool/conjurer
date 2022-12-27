import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

type AccordionType = {
  header: string;
  text: string;
  className?: string;
};

const AccordionComponent = ({ header, text, className }: AccordionType) => {
  return (
    <div className="m-6">
      <Accordion
        className={className}
        style={{
          color: "white",
          backgroundColor: "rgba(4, 73, 130, 0.5)",
        }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon style={{ color: "#fff" }} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography className="text-main">{header}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{text}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
};

export default AccordionComponent;
