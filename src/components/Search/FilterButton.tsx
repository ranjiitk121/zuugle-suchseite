import Button from "@mui/material/Button";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useTranslation } from "react-i18next";
import { RootState } from "../..";
import { hasContent } from "../../utils/globals";
import { useSelector } from "react-redux";
import { alpha } from "@mui/material/styles";
import { theme } from "../../theme";

interface FilterButtonProps {
  setFilterOn: (filterOn: boolean) => void;
}

export default function FilterButton({ setFilterOn }: FilterButtonProps) {
  const { t } = useTranslation();

  const activeFilter = useSelector(
    (state: RootState) => hasContent(state.filter) || state.search.geolocation,
  );

  const buttonColor = activeFilter
    ? theme.palette.info.main
    : theme.palette.primary.main;

  return (
    <Button
      onClick={() => setFilterOn(true)}
      aria-label={t("filter.filter")}
      startIcon={<FilterAltOutlinedIcon />}
      sx={() => ({
        backgroundColor: alpha(buttonColor, 0.06),
        border: `1px solid ${alpha(buttonColor, 0.5)}`,
        color: buttonColor,
        minWidth: { xs: "49%", sm: 100 },
        height: 40,
        paddingX: 2,
        fontWeight: 700,
        transition: "all 0.2s ease-in-out",
        boxShadow: `0 1px 4px ${alpha(buttonColor, 0.2)}`,
        "&:hover": {
          backgroundColor: alpha(buttonColor, 0.15),
          borderColor: buttonColor,
          boxShadow: `0 2px 8px ${alpha(buttonColor, 0.26)}`,
        },
      })}
    >
      {t("filter.filter")}
    </Button>
  );
}
