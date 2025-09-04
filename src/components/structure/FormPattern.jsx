import { Grid, Skeleton } from "@chakra-ui/react";

const FormPattern = () => {
  return (
    <Grid className="blockToCircle" >
      {Array.from({ length: 9 }).map((_, i) => (
        <Skeleton
          key={i}
          height="120px"
          width="100%"
          variant={i % 2 === 0 ? "pulse" : "shine"}
        />
      ))}
    </Grid>
  );
};

export default FormPattern;
