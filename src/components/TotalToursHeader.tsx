import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import AutocompleteCitySelection from "./Search/AutocompleteCitySelection";
import { t } from "i18next";

export default function TotalToursHeader({
  loadedTours,
}: {
  loadedTours?: { total: number };
}) {
  return (
    <Box className={"header-line-main"} sx={{ width: "100%" }}>
      <Box
        sx={{
          paddingTop: "25px",
          paddingBottom: "6px",
          paddingX: "15px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",
        }}
      >
        {loadedTours?.total != undefined && (
          <>
            <Typography
              sx={{
                fontSize: "16px",
                color: "#333",
                whiteSpace: "nowrap",
              }}
            >
              {Number(loadedTours.total).toLocaleString()}
              {loadedTours.total === 1
                ? ` ${t("main.ergebnis")}`
                : ` ${t("main.ergebnisse")}`}
            </Typography>
            <Box sx={{ width: "100%", maxWidth: "300px" }}>
              <AutocompleteCitySelection />
            </Box>
          </>
        )}
      </Box>
    </Box>
  );
}
