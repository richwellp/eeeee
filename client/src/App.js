import React, { useState, useEffect, Component} from 'react';
import './App.css';
import Axios from 'axios';
import $ from 'jquery';


function App () {
  // Querying
  const [isLoading, setLoading] = useState(false);
  const [isError, setError] = useState(false);
  const [data, setData] = useState({});


  const url = "https://www.google.com/search?q=";

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setError(false);
  //     setLoading(true);

  //     try {
  //       const response = await Axios("https://scholar.google.com/");

  //       setData(response.data);
  //     } catch (error) {
  //       setError(true);
  //     }
  //     setLoading(false);
  //   };
  //   fetchData();
  // }, []);

  // CRUD operations
  const [shown, setShown] = useState(false);
  const [pshown, setPshown] = useState(false);
  const [first_name, setfirst_name] = useState("");
  const [last_name, setlast_name] = useState("");
  const [gender, setgender] = useState("");
  const [email, setemail] = useState("");
  const [publication, setPublication] = useState("");

  const [newfirst_name, setNewfirst_name] = useState("");
  const [newlast_name, setNewlast_name] = useState("");
  const [newgender, setNewgender] = useState("");
  const [newemail, setNewemail] = useState("");


  const [entityList, setEntityList] = useState([]);

  const addEntity = () => {
    Axios.post('http://localhost:3001/create', {
      first_name: first_name,
      last_name: last_name,
      gender: gender,
      email: email,

    }).then(() => {
      setEntityList([
        ...entityList,
        {
          first_name: first_name,
          last_name: last_name,
          gender: gender,
          email: email,

        },
      ]);
    });
  };
  
  const getEntities = () => {
    Axios.get("http://localhost:3001/entities").then((response) => {
      setEntityList(response.data);
    });
  };

  const updateEntityDesc = (id) => {
    Axios.put("http://localhost:3001/update", {
      id: id,   
      first_name: newfirst_name, 
      last_name: newlast_name,
      gender: newgender,
      email: newemail,

      }).then(
      (response) => {
        setEntityList(
          entityList.map((val) => {
            return val.id == id
              ? {
                  id: id,
                  first_name: newfirst_name,
                  last_name: newlast_name,
                  gender: newgender,
                  email: newemail,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteEntity = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setEntityList(
        entityList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  const searchEntity = () => {
    Axios.get("http://localhost:3001/entities").then((response) => {
      setEntityList(response.data);
    });
  };
  
  console.log(publication);
// test first_names: http://mjt.web.engr.illinois.edu/ https://alawini.com/ http://hanj.cs.illinois.edu/
  return (
    <div className="App">
      <div className="information">
        <h1>Editor/Dashboard</h1>

        <email>first_name:</email>
        <input type="text" onChange={(event) => {setfirst_name(event.target.value);}}/>

        <email>last_name:</email>
        <input type="text" onChange={(event) => {setlast_name(event.target.value);}}/>

        <email>gender:</email>
        <input type="text" onChange={(event) => {setgender(event.target.value);}}/>

        <email>email:</email>
        <input type="text" onChange={(event) => {setemail(event.target.value);}}/>

        <button onClick={addEntity}>Add Entity</button>
      </div>

      <div className="entities">
        <button onClick={getEntities}>Show Entities</button>

        {entityList.map((val, key) => {
          return (
            <div className="entity">
              <div>
                <h3>first_name: {val.first_name}</h3>
                <h3>last_name: {val.last_name}</h3>
                <h3>gender: {val.gender}</h3>
                <h3>email: {val.email}</h3>
              </div>

              <div>
                <input type="text" onChange={(event) => {
                    setNewfirst_name(event.target.value);
                  }}
                />

                <input type="text" onChange={(event) => {
                    setNewlast_name(event.target.value);
                  }}
                />

                <input type="text" onChange={(event) => {
                    setNewgender(event.target.value);
                  }}
                />

                <input type="text" onChange={(event) => {
                    setNewemail(event.target.value);
                  }}
                />

                <button onClick={() => {updateEntityDesc(val.id);}}>{" "}
                  Update
                </button>

                <button onClick={() => {deleteEntity(val.id);}}>Delete</button>
              </div>
            </div>
          );
        })}
      </div>
      
      <div className="render">
        <button onClick={() => setShown(!shown)}>Toggle Render</button>
        {shown ?  <iframe src={first_name} width='1690px' height='900px' center="yes" scrolling='yes'  frameBorder="0" marginWidth="0"
          marginHeight="0" sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'>
        </iframe> : null}
      </div>
      
      <div className="searchEntity">
        <email>Search Data:</email>
        <input type="text" onChange={(event) => {setPublication(url + event.target.value.split(' ').join('+')  + "&embedded=true");}}/>

        
      </div>

      <div className="publications">
        <email>Publication Search:</email>
        <input type="text" onChange={(event) => {setPublication(url + event.target.value.split(' ').join('+')  + "&embedded=true");}}/>

        <button onClick={() => setPshown(!pshown)}>Show Publications</button>

        {pshown ?  <iframe src={publication} width='1690px' height='900px' center="yes" scrolling='yes'  frameBorder="0" marginWidth="0"
            marginHeight="0" sandbox='allow-modals allow-forms allow-popups allow-scripts allow-same-origin'>
          </iframe> : null}
      </div>
        
      
      

    </div>
  );
  
}

export default App;
