import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import Drawer from "@mui/material/Drawer";
import useStyles from './SearchBarStyles';


interface SearchBarProps {
  toggleSearch: () => void; 
  isSearchOpen: boolean; 
}
const SearchBar : React.FC<SearchBarProps> = ({
  isSearchOpen,
  toggleSearch,
 
}) => {

  const classes = useStyles();

  return (
    <div className={classes.searchContainer}>
      <Drawer
  anchor="right"
  open={isSearchOpen}
  onClose={toggleSearch}
  classes={{ paper: classes.searchDrawer }}
  
>
  <div className={classes.topBar}>
  <span className={classes.searchText}>Buscar</span>
    <IconButton
      color="primary"
      aria-label="close"
      onClick={toggleSearch}
      className={classes.closeButton}
    >
      <CloseIcon />
    </IconButton>
   
  </div>
  
  <div className={classes.searchContainer}>
    <InputBase
      placeholder="¿Qué estás buscando?"
      fullWidth
      className={classes.searchInput}
    />
    <IconButton color="secondary" aria-label="search">
      <SearchIcon style={{ color: "white" }} />
    </IconButton>
  </div>
</Drawer> 
      
    </div>
  );
}

export default SearchBar;
