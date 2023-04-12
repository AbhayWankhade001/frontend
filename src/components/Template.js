import React, { useState, useEffect } from "react";
import "../App.css";
import html2pdf from "html2pdf.js";
import Cookies from "js-cookie";
import 'bootstrap/dist/css/bootstrap.min.css';
//import S3 from 'react-aws-s3';
import AWS from 'aws-sdk';
import ClipLoader from 'react-spinners/ClipLoader';
import jwt_decode from "jwt-decode"

// installed using npm install buffer --save
window.Buffer = window.Buffer || require("buffer").Buffer;


function Template() {

  const s3 = new AWS.S3({
    params: { Bucket: 'clinginvoice' },
    credentials: {
      accessKeyId: 'AKIA3ACAYLO7SQIXYFPJ',
      secretAccessKey: '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',
    },
    region: 'ap-southeast-2'
  });


  const [email, setEmail] = useState("");
  useEffect(() => {
    const token = Cookies.get("token");
    const decoded = jwt_decode(token);
    const id = decoded.employeeId;
    console.log(decoded)
    setIsLoading(true);
    console.log(id)
    fetch(`https://backend-server-14.vercel.app/api/employees/${decoded.employeeId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setEmail(data.user.email);
        setIsLoading(false);
        console.log(data.user.email);
      });
  }, []);








  const generateAndUploadPDF = () => {


    const element = document.getElementById('pdf-element');
    html2pdf()
      .from(element)
      .outputPdf('blob')
      .then((pdfBlob) => {
        const filename = 'test23.pdf';
        const params = {
          Key: filename,
          ContentType: 'application/pdf',
          Body: pdfBlob
        };
        s3.putObject(params, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log('PDF uploaded to S3:', data);
            const objectUrl = `https://${s3.config.params.Bucket}.s3.${s3.config.region}.amazonaws.com/${filename}`;
            console.log('Object URL:', objectUrl);
            window.open(objectUrl, '_blank');
            const pdfNamesplit = objectUrl.split('/').pop();
            console.log(pdfNamesplit)

            const senpdfdata = {
              message: "This is a test message",
              ObjectUrl: { objectUrl },
              pdfName: `${filename}`,
              email: `${email}`

            }

            fetch('https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/send-pdf', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(senpdfdata)
            })
              .then(response => {
                return response.text();
              })
              .then(result => {
                alert(result); // show the result in an alert message
              })
              .catch(error => {
                console.log(error);
              });
          }
        });


      });
  };


  const [tableData, setTableData] = useState([
    { srnum: '', Description: '', Amount: '' }
  ]);

  const handleInputChange = (event, index) => {
    const { name, value } = event.target;
    const newData = [...tableData];
    newData[index][name] = value;
    setTableData(newData);
  };

  const handleAddRow = () => {
    setTableData([...tableData, { srnum: '', description: '', Amount: '' }]);
  };

  const [isLoading, setIsLoading] = useState(true);

  const userId = localStorage.getItem("Id");
  /* console.log("this is the user is",{userId}) */

  const [data, setData] = useState([]);
  useEffect(() => {
    const token = Cookies.get("token");

    setIsLoading(true);

    fetch("https://old-backend-server-14-jqcuvvaua-abhaywankhade001.vercel.app/api/bankDetails", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setData(data);
        setIsLoading(false);
      });
  }, []);

  const {
    id,
    employeeId,
    adminId,
    accountholdername,
    mobilenumber,
    acctype,
    bankname,
    branchname,
    ifsc,
    pannumber,
    __v,
    bankaccnumber,
  } = data;

  const downloadPDF = () => {
    const input = document.getElementById("pdf-element");
    const pdfOptions = {
      margin: 0,
      filename: "my-document.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: "window.devicePixelRatio",
      jsPDF: { unit: "mm", format: "a4" },
    };
    html2pdf().set(pdfOptions).from(input).save();

  };

  const total = tableData.reduce((acc, curr) => {
    return acc + parseFloat(curr.Amount || 0);
  }, 0);

  // Event handler for deleting a row
  const handleDeleteRow = (index) => {
    const newData = [...tableData];
    newData.splice(index, 1);
    setTableData(newData);
  };


  return (
    <>
      <div className="box download-box">
        <button onClick={downloadPDF} className="btn btn-primary mt-4 pt-3 ">
          Download PDF
        </button>
        <button className="btn btn-success mt-4 pt-3 mx-4" onClick={generateAndUploadPDF}>Raise the Invoice</button>
        <button onClick={handleAddRow} className="btn btn-primary mt-4 mx-1 pt-3 ">Add Description Row</button>
      </div>
      {isLoading ? (<ClipLoader />
      ) : (
        <div className="wrapper" id="pdf-element">
          <div className="invoice_wrapper">
            <div className="header">
              <div className="logo_invoice_wrap">
                <div className="logo_sec">
                  <div className="title_wrap">
                    <p className="title bold">{accountholdername}</p>
                    <p className="sub_title"></p>
                  </div>
                </div>
                <div className="invoice_sec">
                  <p className="invoice bold">INVOICE</p>
                  <p className="invoice_no">
                    <span className="bold">Invoice</span>
                    <span>#3488</span>
                  </p>
                  <p className="date">
                    <span className="bold">Date</span>
                    <span> 27/03/2022</span>
                  </p>
                  <p className="date">
                    <span className="bold">PAN</span>
                    <span>{pannumber}</span>
                  </p>
                </div>
              </div>
              <div className="bill_total_wrap">
                <div className="bill_sec">
                  <p className="bold">INVOICE TO</p>
                  <p className="bold name">
                    CLING INFO TECH WORKS (OPC) PRIVATE LIMITED
                  </p>
                  <span>
                    KAILASH NARAIN 2-652 BUDHI VIHAR AVAS VIKAS
                    <br />
                    MBD MURADABAD Moradabad
                    <br />
                    UP 244001 IN
                  </span>
                </div>
              </div>
            </div>
            <div className="relative overflow-x-auto">
              <table className="w-full text-sm text-left text-black-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-blue dark:bg-blue-900 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3 rounded-l-lg" >Sr.No.</th>
                    <th scope="col" className="px-6 py-3">DESCRIPTION</th>

                    <th scope="col" className="px-6 py-3 rounded-r-lg">AMOUNT</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800">
                  {tableData.map((row, index) => (
                    <tr key={index} classname="bg-white dark:bg-gray-800">
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        <input
                          type="text"
                          name="srnum"
                          value={row.srnum}
                          onChange={(event) => handleInputChange(event, index)}
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        <input
                          type="text"
                          name="Description"
                          value={row.Description}
                          onChange={(event) => handleInputChange(event, index)}
                        />
                      </td>
                      <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                        <input
                          type="text"
                          name="Amount"
                          value={row.Amount}
                          onChange={(event) => handleInputChange(event, index)}
                        />
                      </td >
                      {/* <td>
                <button onClick={() => handleDeleteRow(index)}>Delete</button>
              </td> */}
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="paymethod_grandtotal_wrap">
                <div className="paymethod_sec">
                  <p className="bold"></p>
                  <p></p>
                </div>
                <div className="grandtotal_sec">
                  <p className="alignment" >
                    <div>
                      <span className="dis12" > TOTAL</span> </div>
                    <div>
                      <span className="dis12">₹{total.toFixed(2)}</span></div>
                  </p>
                </div>
              </div>
              <div className="bank_details">
                <div>
                  <p className="invoice bold">BANK DETAILS</p>
                  <p className="acc_name">
                    <span>Account Holder Name:</span>
                    <span> {accountholdername}</span>
                  </p>
                  <p className="bank_name">
                    <span>Bank Name:</span>
                    <span> {bankname}</span>
                  </p>
                  <p className="branch_name">
                    <span>Branch Name:</span>
                    <span> {branchname}</span>
                  </p>
                  <p className="acc_num">
                    <span>Account Number:</span>
                    <span> {bankaccnumber}</span>
                  </p>
                  <p className="acc_type">
                    <span>Account Type:</span>
                    <span> {acctype}</span>
                  </p>
                  <p className="ifsccode">
                    <span>IFSC Code:</span>
                    <span> {ifsc}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="footer">
              <p>If you have any questions about this invoice, please contact</p>
              <div className="terms">
                <p>[{accountholdername}, {mobilenumber}]</p>
              </div>
            </div>
          </div>
        </div>
      )
      }
    </>
  );
}

export default Template;