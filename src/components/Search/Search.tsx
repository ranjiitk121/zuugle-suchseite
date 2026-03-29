import Box from "@mui/material/Box";
import FilterButton from "./FilterButton";
import AutocompleteSearch from "./AutocompleteSearch";
import useMediaQuery from "@mui/material/useMediaQuery";
import { theme } from "../../theme";
import Button from "@mui/material/Button";
import { t } from "i18next";
import SearchIcon from "@mui/icons-material/Search";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "../..";
import { alpha } from "@mui/material/styles";
import { SearchWithType, useGetCitiesQuery } from "../../features/apiSlice";
import { cityUpdated, searchWithTypeUpdated } from "../../features/searchSlice";
import { filterUpdated } from "../../features/filterSlice";
import { useAppDispatch } from "../../hooks";
import { useEffect, useState } from "react";

export interface SearchProps {
  setFilterOn?: (filterOn: boolean) => void;
}

export const emptySearch: SearchWithType = { term: "", type: "term" };

export default function Search({ setFilterOn }: SearchProps) {
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
  const filter = useSelector((state: RootState) => state.filter);
  const provider = useSelector((state: RootState) => state.search.provider);
  const city = useSelector((state: RootState) => state.search.city);
  const { data: allCities = [] } = useGetCitiesQuery();
  const isSearchPage = window.location.pathname === "/search";
  const currentSearch = useSelector(
    (state: RootState) => state.search.searchWithType,
  );
  const dispatch = useAppDispatch();

  const [draftSearch, setDraftSearch] = useState<SearchWithType>(
    currentSearch ?? emptySearch,
  );

  useEffect(() => {
    setDraftSearch(currentSearch ?? emptySearch);
  }, [currentSearch]);

  const handleSearch = (search: SearchWithType | null) => {
    let cityUpdate = false;
    if (search === null || search === emptySearch) {
      if (isSearchPage) {
        dispatch(searchWithTypeUpdated(null));
      } else {
        navigate("/search");
      }
      return;
    }
    // very special case: initial setting of city through search bar
    if (search.type === "city" || (search.type === "term" && city === null)) {
      const matchedCity = allCities.find(
        (city) =>
          city.label.toLowerCase() === search.term?.toLowerCase() ||
          city.value.toLowerCase() === search.term?.toLowerCase(),
      );
      if (matchedCity) {
        cityUpdate = true;
        if (isSearchPage) {
          dispatch(cityUpdated(matchedCity));
          dispatch(searchWithTypeUpdated(null));
        }
      }
    }
    if (isSearchPage) {
      if (search.type === "range") {
        dispatch(filterUpdated({ ...filter, ranges: [search.term] }));
        dispatch(searchWithTypeUpdated(null));
      } else {
        dispatch(searchWithTypeUpdated(search));
      }
    } else {
      const searchParams = new URLSearchParams();
      if (provider) {
        searchParams.set("p", provider);
      }
      if (search.type === "range") {
        searchParams.set("range", search.term);
      } else if (cityUpdate) {
        searchParams.set("city", search.term);
      } else {
        searchParams.set("search_type", search.type);
        searchParams.set("search", search.term);
      }
      navigate(`/search?${searchParams.toString()}`);
    }
  };

  return (
    <Box
      sx={{
        zIndex: 20,
        backgroundColor: "#FFF",
        borderRadius: "15px",
        padding: { xs: "10px 12px", sm: "12px 24px" },
        border: "2px solid #ddd",
        boxShadow: "rgba(100, 100, 111, 0.3) 0px 3px 20px 0px",
        boxSizing: "border-box",
        width: { xs: "calc(100% - 24px)" },
        maxWidth: "650px",
        display: "flex",
        alignItems: { xs: "stretch", sm: "center" },
        gap: { xs: 1, sm: 0 },
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box sx={{ flexGrow: 1, width: "100%", marginRight: "15px" }}>
        <AutocompleteSearch
          inputVariant={isXs ? "outlined" : "standard"}
          handleSearch={handleSearch}
          searchWithType={draftSearch}
          setSearchWithType={setDraftSearch}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          gap: 1,
          width: { xs: "100%", sm: "auto" },
          justifyContent: { xs: "center", sm: "flex-end" },
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        <Button
          onClick={() => handleSearch(draftSearch)}
          aria-label={t("search.search")}
          startIcon={<SearchIcon />}
          sx={(muiTheme) => ({
            backgroundColor: muiTheme.palette.primary.main,
            color: muiTheme.palette.common.white,
            minWidth: { xs: "49%", sm: 100 },
            height: 40,
            paddingX: 2,
            fontWeight: 700,
            transition: "all 0.2s ease-in-out",
            boxShadow: `0 2px 8px ${alpha(muiTheme.palette.primary.main, 0.2)}`,
            "&:hover": {
              backgroundColor: muiTheme.palette.primary.dark,
              boxShadow: `0 3px 12px ${alpha(muiTheme.palette.primary.main, 0.26)}`,
            },
          })}
        >
          {t("search.search")}
        </Button>
        {setFilterOn && <FilterButton setFilterOn={setFilterOn!} />}
      </Box>
    </Box>
  );
}
