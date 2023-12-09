import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
// import { userColumns,hotelColumns,roomColumns, userRows} from "../../datatablesource";
import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({columns}) => {
  
  const [list, setList] = useState([]);
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, loading, error } = useFetch(`/${path}`);
  useEffect(() => {
    setList(data);
  }, [data]);


  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) =>item._id !== id));
    } catch (err) {console.log(err)}
  };

  

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
              {/* <NavLink to="/users/params.row._id"  style={{ textDecoration: "none" }}> */}
          
            <NavLink to={`/${path}/${params.row._id}`}  style={{ textDecoration: "none" }}>
          
            {/* <NavLink to={`/${path}/${params.row._id}`}  style={{ textDecoration: "none" }}> */}
              <div className="viewButton">View</div>
            </NavLink>
      
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <NavLink to={`/${path}/new`} className="link">
          Add New
        </NavLink>
      </div>
      {/* <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      /> */}

{
  list.length > 0 ? (
    <DataGrid
      className="datagrid"
      rows={list}
      columns={columns.concat(actionColumn)}
      pageSize={9}
      rowsPerPageOptions={[9]}
      checkboxSelection
      getRowId={(row) => row._id}
    />
  ) : (
   
    <div>Loading...</div>
  )
}

    </div>
  );
};

export default Datatable;
