import DeleteIcon from "@mui/icons-material/Delete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {
  Accordion,
  AccordionActions,
  AccordionDetails,
  AccordionSummary,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useMemo, useRef, useState } from "react";
import { editCombo, getAllCombos } from "../../../api/combos";
import { Combo } from "../../../types/combo";

export default function ComboDataGrid() {
  const [keyword, setKeyword] = useState("");
  const [expanded, setExpanded] = useState<string | false>(false);
  const accordionRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const handleChange = (panel: string) => (_: any, newExpanded: boolean) => {
    setExpanded(newExpanded ? panel : false);
  };

  const queryClient = useQueryClient();

  const { data: combos } = useQuery({
    queryKey: ["combos"],
    queryFn: async () => await getAllCombos(),
  });

  const filteredCombos = useMemo(
    () => (combos ?? []).filter((combo) => combo.name.toLocaleLowerCase().includes(keyword.toLowerCase())),
    [combos, keyword]
  );

  useEffect(() => {
    if (expanded && accordionRefs.current[expanded]) {
      const element = accordionRefs.current[expanded];
      const elementRect = element.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.pageYOffset;
      const middle = absoluteElementTop - window.innerHeight / 2;
      window.scrollTo({
        top: middle,
        behavior: "smooth",
      });
    }
  }, [expanded]);

  const handleDeleteTest = async (combo: Combo, testId: string) => {
    const deletedTest = combo.tests.find((test) => test._id == testId);
    const updatedTests = combo.tests.map((test) => test._id).filter((id) => id !== testId);
    const updatedCombo = { ...combo, tests: updatedTests };

    try {
      await editCombo(combo._id, updatedCombo);
      queryClient.invalidateQueries({ queryKey: ["combos"] });
      alert(`Xoá xét nghiệm ${deletedTest?.name} thành công`);
    } catch (error) {
      console.error("Failed to update combo:", error);
    }
  };

  return (
    <Stack direction="column" spacing={2}>
      <Stack direction="row" spacing={3}>
        <TextField
          label="Tìm các gói xét nghiệm"
          variant="outlined"
          fullWidth
          margin="normal"
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
        />
      </Stack>
      <Typography variant="caption">Tìm thấy {filteredCombos.length} bộ xét nghiệm thoả mãn</Typography>
      <List>
        {(filteredCombos ?? []).map((combo) => (
          <Accordion
            expanded={expanded == combo._id}
            key={combo._id}
            onChange={handleChange(combo._id)}
            ref={(el) => (accordionRefs.current[combo._id] = el)}
            sx={{
              border: expanded === combo._id ? "1px solid rgba(0, 0, 0, 0.5)" : "none",
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <ListItemText
                primary={combo.name}
                secondary={
                  <Stack>
                    <Typography>Giá tiền ${combo.price}</Typography>
                    <Typography>Số lượng xét nghiệm {combo.tests.length}</Typography>
                  </Stack>
                }
              />
            </AccordionSummary>
            <AccordionDetails>
              <List dense disablePadding>
                {(combo.tests ?? []).map((test, index) => (
                  <ListItem disablePadding key={index} divider>
                    <ListItemText primary={test.name} />
                    <ListItemSecondaryAction>
                      <IconButton edge="end" aria-label="delete" onClick={() => handleDeleteTest(combo, test._id)}>
                        <DeleteIcon />
                      </IconButton>
                    </ListItemSecondaryAction>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
            <AccordionActions>
              <Button color="error" variant="outlined">
                Xoá gói xét nghiệm
              </Button>
            </AccordionActions>
          </Accordion>
        ))}
      </List>
    </Stack>
  );
}
