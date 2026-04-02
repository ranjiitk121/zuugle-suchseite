import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import { useTranslation } from "react-i18next";
import { RootState } from "../..";
import { hasContent } from "../../utils/globals";
import { useSelector } from "react-redux";
import { theme } from "../../theme";
import { OutlinedButton } from "../OutlinedButton";

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
    <OutlinedButton
      onClick={() => setFilterOn(true)}
      aria-label={t("filter.filter")}
      startIcon={<FilterAltOutlinedIcon />}
      variant="outlined"
      buttonColor={buttonColor}
      sx={() => ({
        minWidth: { xs: "49%", sm: 100 },
      })}
    >
      {t("filter.filter")}
    </OutlinedButton>
  );
}
