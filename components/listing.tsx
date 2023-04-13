import * as React from 'react';
import axios from 'axios';
import { debounce } from 'debounce';
import { useEffect, useState, useMemo } from 'react';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button } from '@mui/material';
import ManIcon from '@mui/icons-material/Man';
import WomanIcon from '@mui/icons-material/Woman';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
//dialog box

//dialog box end
import WcIcon from '@mui/icons-material/Wc';

export interface Record {
  _id: string;
  sname: string;
  fname: string;
  email: string;
  dob: string;
  gender: string;
  contact: string;
  location: {
    display_name: string;
  };
  country: {
    label: string;
    code: string;
    phone: string;
  };
  skills: string[];
}

interface Props {
  records: Record[];
  onDelete: (id: string) => void;
  onEdit: (record: Record) => void;
}

export default function BasicTable({ records, onDelete, onEdit }: Props) {
  const [filteredPosts, setFilteredPosts] = React.useState<Record[]>([]);
  const stl = {
    fontSize: '15px',
    fontWeight: '600',
  };
  // Ag grid columns
  interface Column {
    headerName: string;
    field?: string;
    filter?: boolean;
    width?: number;
    cellRenderer?: (params: any) => string | JSX.Element ;
    // cellRendererFramework?: (params: any) => JSX.Element;
    pinned?: 'left' | 'right';
  }
  


  const [columns] = useState<Column[]>([
    { headerName: "Name", field: "sname", filter: true, width: 160 },
    { headerName: "Father Name", field: "fname", width: 160 },
    { headerName: "Email", field: "email" },
    { headerName: "DOB", field: "dob", width: 150 },
    { headerName: "Gender", field: "gender", width: 100 },
    { headerName: "Contact", field: "contact", width: 150 },
    { headerName: "Skills", field: "skills", filter: true },
    {
      headerName: "Address",
      field: "location",
      width: 350,
      cellRenderer: (params: any): string => {
        if (params.value) {
          return `${params.value.display_name}`
        }
        return ""
      }
    },
    {
      headerName: "Country (code)",
      field: "country",
      cellRenderer: (params: any): string => {
        if (params.value) {
          return `${params.value.label} (${params.value.code}) (${params.value.phone})`;
        }
        return "";
      }
    },
    
    { headerName: "Message", field: "message", filter: true },
    {
      headerName: "Actions",
      pinned: 'right',
      cellRenderer: (params: any): JSX.Element => (
        <>
          <EditIcon
            sx={{ color: "blue", marginRight: '10px' }}
            onClick={() => editRecord(params.data)}
          />
          <DeleteIcon
            sx={{ color: "red", marginLeft: '10px' }}
            onClick={() => onDelete(params.data._id)}
          />
        </>
      ),
      width: 110
    },
  ]);
  const editRecord = (data: any) => {
    onEdit(data);
  }
  // Ag grid columns ends

  // DefaultColDef sets props common to all Columns
  const defaultColDef = useMemo(() => ({
    sortable: true
  }), []);
  // DefaultColDef sets props common to all Columns ends

  const search = debounce((e:  React.ChangeEvent<HTMLInputElement>) => {
    const searchText: string = e.target.value.toLowerCase();
    const filteredPosts = records.filter(post =>
      post.sname.toLowerCase().includes(searchText) ||
      post.fname.toLowerCase().includes(searchText) ||
      post.email.toLowerCase().includes(searchText) ||
      post.contact.includes(searchText) ||
      post.dob.includes(searchText) ||
      post.gender.toLowerCase().includes(searchText) ||
      post.country.label.toLowerCase().includes(searchText) ||
      post.location.display_name.toLowerCase().includes(searchText) ||
      post.skills.toString().toLowerCase().includes(searchText)
    );
    setFilteredPosts(filteredPosts);
    console.log("From table", filteredPosts);
  }, 300); // Wait 500ms before executing the function


  const male = () => {
    setFilteredPosts(records.filter(post => post.gender === "male" || post.gender === "Male"));
  }
  const female = () => {
    setFilteredPosts(records.filter(post => post.gender === "female" || post.gender === "Female"));
  }
  useEffect(() => {
    setFilteredPosts(records);
  }, [records]);

  return (
    <>
      <div style={{ backgroundColor: 'rgb(244, 244, 244)', display: 'flex', flexWrap: 'wrap-reverse', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
        <div>
          <Button variant="contained" color="primary" sx={{ marginX: 1 }} onClick={() => setFilteredPosts(records)}><WcIcon /></Button>
          <Button variant="contained" color="primary" sx={{ marginX: 1 }} onClick={male}><ManIcon /></Button>
          <Button variant="contained" color="primary" onClick={female}><WomanIcon /></Button>
        </div>
        <TextField
          sx={{ marginX: 1, width: '30%' }}
          InputProps={{
            style: {
              borderRadius: 15, // specify the desired radius
            }
          }}
          label="Search"
          id="standard-size-small"
          size="small"
          variant="outlined"
          onChange={search}
        />
      </div>

      {/* Ag Grid Start */}
      <div className="ag-theme-alpine" style={{ height: '510px' }}>
        <AgGridReact 
        rowData={filteredPosts} 
        columnDefs={columns} 
        animateRows={true} 
        defaultColDef={defaultColDef}
        loadingCellRenderer={"wait its loading"}
        >
        </AgGridReact>
      </div>

    </>
  );
}