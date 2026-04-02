import { useSelector } from "react-redux";
import { RootState } from "../..";
import { useAppDispatch } from "../../hooks";
import { useIsMobile } from "../../utils/muiUtils";
import { boundsUpdated, mapUpdated } from "../../features/searchSlice";
import { HideMapIcon } from "../../icons/HideMapIcon";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { t } from "i18next";
import { OutlinedButton } from "../OutlinedButton";

const MapBtn = () => {
  const showMap = useSelector((state: RootState) => state.search.map);
  const dispatch = useAppDispatch();
  const isMobile = useIsMobile();

  const iconSize = { fontSize: 22 };
  const icon = showMap ? (
    <HideMapIcon sx={iconSize} />
  ) : (
    <MapOutlinedIcon sx={iconSize} />
  );

  const mapBtnText = isMobile
    ? icon
    : showMap
      ? t("main_only.kartenansicht_entfernen")
      : t("start_pages.zur_kartenansicht");

  const handleClick = () => {
    if (showMap) {
      dispatch(boundsUpdated(null));
    }
    dispatch(mapUpdated(!showMap));
  };

  return (
    <OutlinedButton
      variant="outlined"
      onClick={handleClick}
      startIcon={isMobile ? undefined : icon} // show icon as main content on mobile
      sx={{
        position: "fixed",
        bottom: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        margin: "2 auto",
        "@media (min-width: 900px)": {
          bottom: "calc(50px - 3%)", // Move down on screens wider than 900px
        },
      }}
    >
      {mapBtnText}
    </OutlinedButton>
  );
};
export default MapBtn;
