import SearchIcon from "@mui/icons-material/Search";
import { useTranslation } from "react-i18next";
import { alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

interface SearchButtonProps {
  handleSearch: () => void;
}

export default function SearchButton({ handleSearch }: SearchButtonProps) {
  const { t } = useTranslation();
  const muiTheme = useTheme();
  const isXsScreen = useMediaQuery(muiTheme.breakpoints.only("xs"));

  if (isXsScreen) {
    return (
      <IconButton
        onClick={handleSearch}
        aria-label={t("search.search")}
        color="primary"
      >
        <SearchIcon />
      </IconButton>
    );
  } else {
    return (
      <Button
        onClick={handleSearch}
        aria-label={t("search.search")}
        color="primary"
        startIcon={<SearchIcon />}
        sx={(buttonTheme) => ({
          backgroundColor: buttonTheme.palette.primary.main,
          color: buttonTheme.palette.common.white,
          minWidth: 100,
          height: 40,
          fontWeight: 700,
          transition: "all 0.2s ease-in-out",
          boxShadow: `0 2px 8px ${alpha(buttonTheme.palette.primary.main, 0.2)}`,
          "@media (hover: hover) and (pointer: fine)": {
            "&:hover": {
              backgroundColor: buttonTheme.palette.primary.dark,
              boxShadow: `0 4px 12px ${alpha(buttonTheme.palette.primary.main, 0.26)}`,
            },
          },
          "&:active": {
            backgroundColor: buttonTheme.palette.primary.dark,
            boxShadow: `0 4px 12px ${alpha(buttonTheme.palette.primary.main, 0.26)}`,
          },
        })}
      >
        {t("search.search")}
      </Button>
    );
  }
}
