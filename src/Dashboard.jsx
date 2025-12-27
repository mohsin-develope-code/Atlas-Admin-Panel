import React, { useState, useEffect} from 'react'
import { X, Menu, Home, LogOut } from 'lucide-react';
import {useNavigate} from 'react-router-dom';
import {BASE_URL} from './Base-Url'


import { AllCommunityModule, ModuleRegistry } from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";

ModuleRegistry.registerModules([AllCommunityModule]);



const Dashboard = () => {



   const [rowData, setRowData] = useState([]);
  
    // Column Definitions: Defines & controls grid columns.
    const [colDefs, setColDefs] = useState([
      { field: "Name" },
      { field: "Phone" },
      { field: "Email" },
      { field: "Alternate Phone" },
      { field: "City" },
      { field: "Graduation College Name" },
      { field: "Course" },
      { field: "Graduation Year" },
      { field: "Planning For MBA" },
      { field: "Preferred College Location" },
      { field: "Given Any Entrance Exam?" },
      { field: "Come With Your Group Of Friends" },
      { field: "Friend's Name and Phone Number" },
      { field: "Attendence For The Event" },
      {field: "Planning MBA or Scholarship"},
      { field: "Seminar Expert"}
    ]);

const defaultColDef = {
  resizable: true,
  sortable: true,
};













  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState('dashboard');
  const [userData, setUserData] = useState();
  const [clicked, setClicked] = useState();

  const [regUser, setRegUser] = useState();
  const [uploadUser, setUploadUser] = useState();
  const [forceUser, setForceUser] = useState();


  // Temporary commet
  //Convert JSON data into excel sheet data
  // function downloadExcelFromJson(data, filename = "alumni.xlsx"){
   
  //   if (!data || !data.length) {
  //   alert("No data to export");
  //   return;
  //   }

  //   const worksheet = XLSX.utils.json_to_sheet(data);

  //    const workbook = XLSX.utils.book_new();
  //    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

  //    // Write and trigger download in browser
  //    XLSX.writeFile(workbook, filename);
  // }





  useEffect(() => {
  if (activeView === 'dashboard') {
    dataGet();
  }
}, [activeView]);






      async function dataGet(){
    try {
      const response = await fetch(`${BASE_URL}/api/admin/reg-user`,{
                                    method: 'GET',
                                    credentials: "include",
                                    headers: {
                                    Authorization: "Bearer "+localStorage.getItem("token"),
                                    "Content-Type" : "application/json"}
                                  })

            const result = await response.json();
            const {status, data, stats} = result;

             setRegUser(stats.noRegisterUser)
             setUploadUser(stats.noUploadUser)
             setForceUser(stats.noForceUser)

            if(status){

              let studentTab = []
              data.map((item) => {

                studentTab = [...studentTab, 
                  {
                    "Name": item.name, 
                    "Phone": item.phone,
                    "Email": item.email,
                    "Alternate Phone": item.alternatePhone,
                    "City": item.city, 
                    "Graduation College Name": item.collegeName,
                    "Course": item.course,
                    "Graduation Year": item.graduationYear,
                    "Planning For MBA": item.planning,
                    "Preferred College Location": item.collegeLocation,
                    "Given Any Entrance Exam?" : item.exam,
                    "Come With Your Group Of Friends":  item.friend,
                    "Friend's Name and Phone Number": item.allFriendsDetails.length > 0? item.allFriendsDetails.map((info) => `${info.name}-${info.phone}  || `) : null,
                    "Attendence For The Event": item.attendence,
                    "Planning MBA or Scholarship": item.planScholarship,
                    "Seminar Expert" : item.seminarExpert,



                  }]

              } )







              setRowData(studentTab);
              console.log("It's work...")
              console.log(studentTab)
            } else {
              alert('Something error to data fetch..')
            }

    } catch (error) {
      alert('Network Error, Something is wrong')
    }
  }





   async function getUploadStudent(){
    console.log("Get Upload API Call")

    try {
      const response = await fetch(`${BASE_URL}/api/admin/upload-user`,{
                                    method: 'GET',
                                    credentials: "include",
                                    headers: {
                                    Authorization: "Bearer "+localStorage.getItem("token"),
                                    "Content-Type" : "application/json"}
                                  })

            const result = await response.json();
            const {status, data} = result;

            console.log(data);

            if(status){

              let studentTab = []
              data.map((item) => {

                studentTab = [...studentTab, 
                  {
                    "Name": item.name, 
                    "Phone": item.phone,
                    "Email": item.email,
                    "Alternate Phone": item.alternatePhone,
                    "City": item.city, 
                    "Graduation College Name": item.collegeName,
                    "Course": item.course,
                    "Graduation Year": item.graduationYear,
                    "Planning For MBA": item.planning,
                    "Preferred College Location": item.collegeLocation,
                    "Given Any Entrance Exam?" : item.exam,
                    "Come With Your Group Of Friends":  item.friend,
                    "Friend's Name and Phone Number": item.allFriendsDetails,
                    "Attendence For The Event": item.attendence,
                    "Planning MBA or Scholarship": item.planScholarship,
                    "Seminar Expert" : item.seminarExpert,



                  }]
              })


              setRowData(studentTab);
              console.log(userData)
            } else {
              alert('Something error to data fetch..')
            }

    } catch (error) {
      alert('Network Error, Something is wrong')
    }
  }




   async function getForceStudent() {
    console.log("Get Force API Call")

    try {
      const response = await fetch(`${BASE_URL}/api/admin/force-user`,{
                                    method: 'GET',
                                    credentials: "include",
                                    headers: {
                                    Authorization: "Bearer "+localStorage.getItem("token"),
                                    "Content-Type" : "application/json"}
                                  })

            const result = await response.json();
            const {status, data} = result;

            console.log(data);

            if(status){

               let studentTab = []
              data.map((item) => {

                studentTab = [...studentTab, 
                  {
                    "Name": item.name, 
                    "Phone": item.phone,
                  }]
              })


              setRowData(studentTab);



              setUserData(data);
              console.log(userData)
            } else {
              alert('Something error to data fetch..')
            }

    } catch (error) {
      alert('Network Error, Something is wrong')
    }
  }










  useEffect(() => {

    async function logout() {

      console.log("clicked logout button..")
      
    
      const res = await fetch(`${BASE_URL}/admin/logout`,
                            {
                              method: 'GET',
                              credentials: "include",
                              headers: {
                                  Authorization: "Bearer "+localStorage.getItem("token"),
                                  "Content-Type" : "application/json"
                                }
                              
                            }
                          )

        const result = await res.json();

        const {status} = result;

        if(status){
         localStorage.removeItem('login');
         localStorage.removeItem('token');
         navigate('/login');

        } else {
          alert('Network Error, Something is wrong')
        }

    }

    if(clicked){
      logout();
    }


  }, [clicked])



 




  const menuItems = [
    { id: 'dashboard', label: 'Register Student', icon: Home },
    { id: 'uploadDashboard', label: 'Uploaded Student', icon: Home },
    { id: 'forceDashboard', label: 'Force Pass Student', icon: Home },
  ];

  
  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      <div className={`fixed inset-y-0 left-0 z-30 w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out 
                      ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className="text-xl font-bold">Atlas MBA Seminar</h1>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-400 hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map(item => {
              const Icon = item.icon;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id);
                      // if( item.id === 'dashboard'){
                      //   dataGet()
                      // } else 
                        if(item.id === "uploadDashboard"){
                        getUploadStudent()
                      } else {
                        getForceStudent()
                      }
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      activeView === item.id
                        ? 'bg-[#CF3D3E] text-white'
                        : 'text-gray-300 hover:bg-gray-800'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

      

         

        <div className='h-full mt-auto text-gray-100 p-10'> 
          <p className='text-gray-400 py-1'>Register Student: <span className='font-bold'>{regUser}</span> </p>
          <p className='text-gray-400 py-1'>Uploaded Student: <span className='font-bold'>{uploadUser}</span></p>
          <p className='text-gray-400 py-1'>Direct Pass Student: <span className='font-bold'>{forceUser}</span></p>
          <p className='text-gray-400 py-1'>Total: {regUser + uploadUser + forceUser }</p>
        </div>



        <div className="absolute bottom-0 w-64 p-4  border-t border-gray-700">
           <div  
                 className='text-white py-4'>
              <div onClick={() => setClicked(true)} className='flex gap-x-2.5 justify-center items-center text-lg bg-[#CF3D3E] px-4 py-2.5 rounded-lg transition-colors hover:cursor-pointer'>
                <button>Logout</button> 
                <LogOut/>
              </div>
           </div>
        </div>

      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}


      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">


        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden text-gray-600 hover:text-gray-900"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-semibold text-gray-800">
              {menuItems.find(item => item.id === activeView)?.label || 'Dashboard'}
            </h2>
            <div className="w-6 lg:w-auto"></div>

          </div>
        </header>





        <div className="w-auto h-screen overflow-hidden">
         <div className="h-full overflow-y-auto w-auto overflow-x-auto">


            <div
                className="overflow-auto"
                style={{ width: "100%", height: "100%" }}
              >
                <AgGridReact
                  rowData={rowData}
                  columnDefs={colDefs}
                  defaultColDef={defaultColDef}
                  
                />
            </div>
      
           

      
        </div>


        </div>



         




  





      </div>




    </div>
  )
}

export default Dashboard