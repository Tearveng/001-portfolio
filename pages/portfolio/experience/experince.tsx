import { Badge, Box } from "@chakra-ui/react";
import { Data, Experiences, experiences, Experince } from "../../../lib/api/api";

const Experience = ({ value }: any) => {
  return (
    <>
      <Box>
        <Badge colorScheme="green">
          {value.date} Year {value.year}:{" "}
        </Badge>
        <br />

        <Box ml={7}>
          {value.exp.map((v: Experince, i: number) => (
            <Box key={i}>
              <Badge colorScheme="purple">{v.type} :</Badge>
              <br />

              {v.data.map((value: Data, i) => (
                <Box key={i} ml={7} display="flex">
                  <Badge colorScheme="red">
                    - {value.type} : <br />
                  </Badge>
                  {/* <Spacer /> */}
                  <p
                    style={{
                      marginTop: "-2px",
                      fontSize: "14px",
                      marginLeft: "20px",
                      fontWeight: 600,
                    }}
                  >
                    {value.description}
                  </p>
                  <br />
                </Box>
              ))}
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
};

export default Experience;
