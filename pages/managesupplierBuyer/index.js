/*
 *  Document    : Supplier.js
 *  Author      : uyarchi
 *  Description : Manage Supplier and Buyer
 */
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { Breadcrumb } from "antd";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  ButtonGroup,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
//components
import axios from "../../axios";
//useTable
const useTable = () => {
  const [Loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showLimit, setShowLimit] = useState(10);
  const [gridApi, setGridApi] = useState(null);
  const [rowData, setRowData] = useState(null);
  return {
    currentPage,
    showLimit,
    Loading,
    gridApi,
    rowData,
    setCurrentPage,
    setLoading,
    setShowLimit,
    setGridApi,
    setRowData,
  };
};
// Status
const Status = [
  { value: "pending", label: "Pending" },
  { value: "moderated", label: "Moderated" },
  { value: "rejected", label: "Rejected" },
];

//function init
const Supplier = () => {
  //router
  const router = useRouter();
  //usestate
  const [name, setName] = useState("");
  const [status, setStatus] = useState(false);
  const [reload, setreload] = useState(false);

  //table
  const EmployeeTable = useTable();
  //get employees
  const [id, setId] = useState("");
  const fetchdata = async (page = 1) => {
    EmployeeTable.setLoading(true);
    const response = await axios.get("/v1/postorder");
    if (response.status === 200 && response.data) {
      EmployeeTable.setRowData(response.data);
    } else {
      EmployeeTable.setRowData([]);
    }
  };
  // Search Method
  const handlesearch = () => {
    fetchdata();
  };
  //useEffect
  useEffect(() => {
    fetchdata(EmployeeTable.currentPage, EmployeeTable.showLimit);
  }, [reload, EmployeeTable.currentPage, EmployeeTable.showLimit]);

  //modal for order details
  //usestate
  const [ismoderated, setIsModerated] = useState(false);
  //const [shop, setshop] = useState("");
  const isModeratedClose = () => {
    setIsModerated(false);
  };
  const statusModerate = () => {
    setIsModerated(true);
    //axios.get(`/v1/supplierBuyer/${props}`).then((res) => setshop(res.data));
  };
  //usestate
  const [isrejected, setIsRejected] = useState(false);
  //const [shop, setshop] = useState("");
  const isRejectedClose = () => {
    setIsRejected(false);
  };
  const statusRejected = () => {
    setIsRejected(true);
    //axios.get(`/v1/supplierBuyer/${props}`).then((res) => setshop(res.data));
  };
  return (
    <>
      <Head>
        <title>Supplier/Buyer App - Manage Supplier</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="p-4 ">
        <div className="w-full pb-4">
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item>
              Moderate Customers (Supplier and Buyer)
            </Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <hr className="p-1"></hr>
        <div className="flex items-center pb-4">
          <span className="flex-auto text-sky-500 text-xl">
            Moderate Customers (Supplier and Buyer)
          </span>
          <div className="flex items-center gap-3">
            <Button colorScheme="blue" onClick={() => router.back()}>
              Back
            </Button>
            <Button colorScheme="blue" onClick={() => router.reload()}>
              Refresh
            </Button>
          </div>
        </div>
        <hr className="p-1"></hr>
        <div className="flex items-center gap-3 pb-4">
          <div className="flex-auto font-semibold text-primary"></div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Search By :</label>
            <select
              placeholder="Select"
              style={{ outline: 0 }}
              className="border border-graycolor w-36 focus-outline-none bg-whitecolor experience"
              // onChange={(e) => {
              //   setUserId(e.target.value);
              //   e.target.classList.add("change_color");
              //   getpzone(e.target.value);
              // }}
            >
              <option value="null">Select Date</option>
              {Status &&
                Status.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
            <select
              onChange={(e) => {
                setStatus(e.target.value);
                e.target.classList.add("change_color");
              }}
              style={{ outline: 0 }}
              className="border border-graycolor w-36 focus-outline-none bg-whitecolor experience"
              required
            >
              <option value="null">Select Status</option>
              {Status &&
                Status.map((item, index) => (
                  <option key={index} value={item.value}>
                    {item.label}
                  </option>
                ))}
            </select>
          </div>
          <div className="flex text-center pr-2 gap-2">
            <Button colorScheme="blue" onClick={handlesearch}>
              Go
            </Button>
          </div>
        </div>
        <div className="border-gray-500 scroll-smooth border">
          <Table
            size="sm"
            scaleY="44"
            variant="striped"
            colorScheme="whatsapp"
            className="overflow-auto"
          >
            <Thead className="bg-headergreen">
              <Tr>
                <Th>S.No</Th>
                <Th>Date</Th>
                <Th>Type</Th>
                <Th>name</Th>
                <Th>Product</Th>
                <Th>Old Price</Th>
                <Th>Moderated Price</Th>
                <Th>Map View</Th>
                <Th>Status</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {/* <Tr>
                <Td>01</Td>
                <Td>14-06-2022</Td>
                <Td>Supplier</Td>
                <Td>Crazy</Td>
                <Td>Tomato</Td>
                <Td>100</Td>
                <Td>Nill</Td>
                <Td>Pending</Td>
                <Td>
                  <ButtonGroup spacing="1">
                    <Button
                      size="xs"
                      colorScheme="blue"
                      onClick={() => {statusModerate();setName("sup");}}
                    >
                      Moderated
                    </Button>
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => statusRejected()}
                      // onClick={() => {
                      //   setIsRejectOpen(true);
                      //   setRejectedId(item._id);
                      // }}
                    >
                      Rejected
                    </Button>
                  </ButtonGroup>
                </Td>
              </Tr> */}
              {EmployeeTable.rowData != "" ? null : (
                <Tr className="flex justify-center text-center px-2 ">
                  No Data Found
                </Tr>
              )}
              {EmployeeTable.rowData &&
                EmployeeTable.rowData.map((item, index) => (
                  <Tr key={index}>
                    <Td>{index + 1}</Td>
                    <Td>{item.date}</Td>
                    <Td>{item.type}</Td>
                    <Td>{item.name}</Td>
                    <Td>{item.buyerpname}</Td>
                    <Td>{item.expprice}</Td>
                    <Td>
                      <Button
                        size="sm"
                        colorScheme="blue"
                        variant="link"
                        onClick={() => isopenshop(item._id)}
                      >
                        {item.primaryContactName}
                      </Button>
                    </Td>
                    <Td>{item.primaryContactNumber}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>
        <Modal isOpen={ismoderated} onClose={isModeratedClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Alert</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>Are you sure, Do you want to MODERATE Craze ?</div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={isModeratedClose} colorScheme="blue" mr={3}>
                Yes
              </Button>
              <Button onClick={isModeratedClose} colorScheme="red" mr={3}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isrejected} onClose={isRejectedClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Alert</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div>Are you sure, Do you want to REJECT Craze ?</div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={isRejectedClose} colorScheme="blue" mr={3}>
                Yes
              </Button>
              <Button onClick={isRejectedClose} colorScheme="red" mr={3}>
                No
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
export default Supplier;
