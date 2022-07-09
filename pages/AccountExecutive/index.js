/*
 *  Document    : index.js
 *  Author      : uyarchi
 *  Description : Account Executive
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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

//components
import InputFields from "../controls/InputFields";
import Forms from "../controls/Forms";
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
//function init
const AmountExecutive = () => {
  //router
  const router = useRouter();
  // UseState

  const [reload, setreload] = useState(false);
  const [statusname, setstatusname] = useState([]);
  const [productslist, setproductslist] = useState([]);
  const [distance, setdistance] = useState("");
  const [distancetonum, setdistancetonum] = useState("");
  const [totalprice, setTotalprice] = useState("");
  const [Details, setDetails] = useState("");
  useEffect(() => {
    axios
      .get("/v1/requirementCollection/thirdPartyApi/product")
      .then((res) => setproductslist(res.data));
  }, []);

  //table
  const EmployeeTable = useTable();
  //get employees
  const fetchdata = async (page = 1) => {
    EmployeeTable.setLoading(true);
    const response = await axios.get(
      // `/v1/requirementCollection/supplier/productName/${Product}/${FromPrice}/${ToPrice}/${FromQty}/${ToQty}/null/${
      //   page - 1
      // }`
      "/v1/requirementCollectionBS/Buyer/Live/all"
    );
    if (response.status === 200 && response.data) {
      EmployeeTable.setRowData(response.data);
      console.log(response.data);
      //   setreload(!reload);
    } else {
      EmployeeTable.setRowData([]);
    }
  };
  useEffect(() => {
    fetchdata(EmployeeTable.currentPage, EmployeeTable.showLimit);
  }, []);

  // Search Method
  const handlesearch = () => {
    EmployeeTable.setCurrentPage(1);
    fetchdata(EmployeeTable.currentPage, EmployeeTable.showLimit);
  };
  //usestate
  const [isvehicle, setisvehicle] = useState(false);
  const isvehicleclose = () => {
    setisvehicle(false);
  };
  const vehicleopen = (props) => {
    console.log(props);
    setTotalprice(
      props.expectedQnty * props.moderatedPrice + props.expectedQnty * 5
    );
    //let a = props.expquantity * props.editedPrice + props.expquantity * 5
    console.log(props.stockLocation);
    setisvehicle(true);
    const key = "AIzaSyDoYhbYhtl9HpilAZSy8F_JHmzvwVDoeHI";
    axios
      .get(
        `/v1/requirementCollection/thirdPartyApi/googleMap/${BuyerData.deliverylocation}/${props.stockLocation}/${key}`
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.data.rows[0].elements[0].distance.text);
        setdistance(res.data.rows[0].elements[0].distance.text);
        // if(res.data.rows[0].elements[0].distance.text )
        const myArray = res.data.rows[0].elements[0].distance.text.split(" ");
        console.log(myArray[0]);
        setdistancetonum(myArray[0]);
      });
  };
  // const Interested = (props) => {
  //   const data = {
  //     matchesstatus: "Interested",
  //   };
  //   axios.put(`/v1/requirementCollection/${props}`, data).then((res) => {
  //     console.log(res.data);
  //     setreload(!reload);
  //   });
  // };
  //usestate
  const [isSupplieropen, setIsSupplieropen] = useState(false);
  const isSupplierclose = () => {
    setIsSupplieropen(false);
  };
  const Matche = (props) => {
    setIsSupplieropen(true);
    setDetails(props);
  };
  //usestate
  const [isBuyerDetails, setBuyerDetails] = useState(false);
  const [BuyerData, setBuyerData] = useState("");
  const [SupplierData, setSupplierData] = useState("");

  const isBuyerDetailsClose = () => {
    setBuyerDetails(false);
  };
  const Buyer = (props) => {
    setBuyerDetails(true);
    axios
      .get(`/v1/requirementCollectionBS/Buyer/${props}`)
      .then((res) => setBuyerData(res.data[0]));
  };
  //usestate
  const [islastTimeUpdatedQtyRange, setLastTimeUpdatedQtyRange] =
    useState(false);
  const [UpdatedDetails, setUpdatedDetails] = useState([]);
  let UpdateQty = [];
  let UpdatePrice = [];
  let UpdateLocation = [];
  UpdatedDetails.map((item) =>
    item.QtyMin && item.QtyMax ? UpdateQty.push(item) : null
  );
  UpdatedDetails.map((item) =>
    item.priceMin && item.priceMax ? UpdatePrice.push(item) : null
  );
  UpdatedDetails.map((item) =>
    item.deliveryLocation ? UpdateLocation.push(item) : null
  );
  const isLastTimeUpdatedQtyRangeClose = () => {
    setLastTimeUpdatedQtyRange(false);
  };
  const UpdatedQtyRangeList = (props) => {
    setLastTimeUpdatedQtyRange(true);
    axios
      .get(`/v1/requirementCollectionBS/Buyer/UpdataData/${props}`)
      .then((res) => setUpdatedDetails(res.data));
  };
  //usestate
  const [islastTimeUpdatedPriceRange, setLastTimeUpdatedPriceRange] =
    useState(false);
  //const [UpdatedDetails, setUpdatedDetails] = useState("");
  const isLastTimeUpdatedPriceRangeClose = () => {
    setLastTimeUpdatedPriceRange(false);
  };
  const UpdatedPriceRangeList = (props) => {
    setLastTimeUpdatedPriceRange(true);
    axios
      .get(`/v1/requirementCollectionBS/Buyer/UpdataData/${props}`)
      .then((res) => setUpdatedDetails(res.data));
  };
  //usestate
  const [islastTimeUpdatedLocation, setLastTimeUpdatedLocation] =
    useState(false);
  //const [UpdatedDetails, setUpdatedDetails] = useState("");
  const isLastTimeUpdatedLocationClose = () => {
    setLastTimeUpdatedLocation(false);
  };
  const UpdatedLocationList = (props) => {
    setLastTimeUpdatedLocation(true);
    axios
      .get(`/v1/requirementCollectionBS/Buyer/UpdataData/${props}`)
      .then((res) => setUpdatedDetails(res.data));
  };
  //   //modal for map
  //   const [slat, setslat] = useState("");
  //   const [slng, setslng] = useState("");
  //   const { isOpen, onOpen, onClose } = useDisclosure();
  //   //mapview
  //   const isOpenmap = (props) => {
  //     console.log(props);
  //     onOpen();
  //     setslat(props.lat);
  //     setslng(props.lang);
  //   };
  //   const mapStyles = {
  //     height: "100%",
  //     width: "100%",
  //   };
  //usestate
  const [fixed, setfixed] = useState(false);
  const [fixedd, setfixedd] = useState([]);
  const fixedclose = () => {
    setfixed(false);
    // setreload(!reload);
  };
  const fixedTable = () => {
    setfixed(true);
  };

  //usestate
  const [matches, setmatches] = useState(false);
  const [matchesDetails, setmatchesDetails] = useState([]);
  const matcheslistclose = () => {
    setmatches(false);
    // setreload(!reload);
  };
  const matcheslist = (props) => {
    setmatches(true);
    axios
      .get(`/v1/requirementCollectionBS/Buyer/sameProduct/short/all/${props}`)
      .then((res) => {
        // setreload(!reload);
        setmatchesDetails(res.data);
        console.log(res.data);
      });

    //handle change for multiselect

    axios
      .get(`/v1/requirementCollectionBS/Buyer/${props}`)
      .then((res) => setBuyerData(res.data[0]));
  };
  const saveinterest = (props) => {
    const data = {
      data: [props],
      BId: BuyerData._id,
    };
    axios.post("/v1/interestTable", data).then((res) => {
      setreload(!reload);
    });
  };

  return (
    <>
      <Head>
        <title>Supplier/Buyer App - Account Executive</title>
        <meta name="description" content="Generated by create next app" />
      </Head>
      <div className="p-4 ">
        <div className="w-full pb-4">
          <Breadcrumb separator=">">
            <Breadcrumb.Item href="/home">Home</Breadcrumb.Item>
            <Breadcrumb.Item>Account Executive</Breadcrumb.Item>
          </Breadcrumb>
        </div>
        <hr className="p-1"></hr>
        <div className="flex items-center pb-4">
          <span className="flex-auto text-sky-500 text-xl">
            Account Executive
          </span>
          <div className="flex items-center gap-3">
            <Button colorScheme="blue" onClick={() => router.reload()}>
              Refresh
            </Button>
          </div>
        </div>
        {/* <hr className="p-1"></hr>
        <div className="flex items-center gap-3 pb-4">
          <div className="flex-auto font-semibold text-primary"></div>
          <div className="flex">
            <select
              placeholder="Select"
              name="product"
              style={{ outline: 0 }}
              className="border border-graycolor w-24 focus-outline-none bg-whitecolor experience p-1"
              onChange={(e) => {
                EmployeeTable.setCurrentPage(1);
                e.target.classList.add("change_color");
                setProduct(e.target.value.toLowerCase());
              }}
            >
              <option value="null">Select</option>
              {productslist &&
                productslist.map((item, index) => (
                  <option key={index} value={item.productTitle}>
                    {item.productTitle}
                  </option>
                ))}
            </select>
            <span className="text-secondary">*</span>
          </div>
          <div className="flex">
            <InputFields
              type="number"
              placeholder="From Price"
              onChange={(e) => setFromPrice(e.target.value)}
              className="border border-graycolor px-2 w-24 "
            />
            <span className="text-secondary">*</span>
          </div>
          <div className="flex">
            <InputFields
              type="number"
              placeholder="To Price"
              onChange={(e) => setToPrice(e.target.value)}
              className="border border-graycolor px-2 w-24"
            />
            <span className="text-secondary">*</span>
          </div>
          <div className="flex">
            <InputFields
              type="number"
              placeholder="From Quantity"
              onChange={(e) => setFromQty(e.target.value)}
              className="border border-graycolor px-2 w-24"
            />
          </div>
          <div className="flex">
            <InputFields
              type="number"
              placeholder="To Quantity"
              onChange={(e) => setToQty(e.target.value)}
              className="border border-graycolor px-2 w-24"
            />
          </div>
          <div className="flex">
            <InputFields
              type="string"
              placeholder="Destination"
              onChange={(e) => {
                setDestination(e.target.value);
                setdistance("");
                setdistancetonum("");
              }}
              className="border border-graycolor px-2 w-24"
            />
          </div>
          {Product != "null" ? (
            FromPrice != "null" ? (
              ToPrice != "null" ? (
                <div className="flex text-center pr-2 gap-2">
                  <Button colorScheme="blue" onClick={handlesearch}>
                    Go
                  </Button>
                </div>
              ) : null
            ) : null
          ) : null}
        </div> */}

        <div className="border-gray-500 scroll-smooth border overflow-y-scroll">
          <Table
            size="sm"
            scaleY="44"
            variant="striped"
            colorScheme="whatsapp"
            className="overflow-auto"
          >
            <Thead className="bg-headergreen">
              <Tr>
                <Th textAlign="center" className="border">
                  S.No
                </Th>
                <Th textAlign="center" className="border">
                  Date
                </Th>
                <Th textAlign="center" className="border">
                  registered by whom
                </Th>
                <Th textAlign="center" className="border">
                  requirement id
                </Th>
                <Th textAlign="center" className="border">
                  name
                </Th>
                <Th textAlign="center" className="border">
                  product
                </Th>

                <Th textAlign="center" className="border">
                  count for Fixed suppliers
                </Th>
                <Th textAlign="center" className="border">
                  total amount
                </Th>
                <Th textAlign="center" className="border">
                  call status
                </Th>
                <Th textAlign="center" className="border">
                  call Action
                </Th>
                <Th textAlign="center" className="border">
                  payment status
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              {EmployeeTable.rowData != "" ? null : (
                <Tr>
                  <Td
                    style={{ textAlign: "center" }}
                    className="font-semibold"
                    colSpan="8"
                  >
                    No Data Found
                  </Td>
                </Tr>
              )}
              {EmployeeTable.rowData &&
                EmployeeTable.rowData.map((item, index) => (
                  <Tr key={index}>
                    <Td textAlign="center">
                      {index +
                        10 * (parseInt(EmployeeTable.currentPage) - 1) +
                        1}
                    </Td>
                    <Td textAlign="center">{item.date}</Td>
                    <Td textAlign="center">{item.requirementAddBy}</Td>
                    <Td textAlign="center">{item.secretName}</Td>
                    <Td textAlign="center">
                      <Button
                        size="md"
                        colorScheme="blue"
                        variant="link"
                        onClick={() => Buyer(item._id)}
                      >
                        {item.name}
                      </Button>
                    </Td>
                    <Td textAlign="center">{item.product}</Td>
                    <Td textAlign="center">
                      <Button
                        size="md"
                        colorScheme="blue"
                        variant="link"
                        onClick={() => {
                          UpdatedQtyRangeList(item._id);
                        }}
                      >
                        {item.minrange}
                        {"-"}
                        {item.maxrange}
                      </Button>
                    </Td>
                    <Td textAlign="center">{item.shortlist}</Td>
                    {item.fixed ? <Td>{item.fixed}</Td> : <Td>0</Td>}
                    {item.fixed >= 1 ? <Td>Matched</Td> : <Td>Pending</Td>}
                    <Td>
                      <Button
                        size="xs"
                        colorScheme="blue"
                        onClick={() => {
                          matcheslist(item._id);
                        }}
                      >
                        call
                      </Button>
                    </Td>

                    {/* <Td textAlign="center">
                      {Destination != "" ? (
                        <Button
                          variant="link"
                          size="xs"
                          colorScheme="blue"
                          onClick={() => vehicleopen(item)}
                        >
                          VIEW
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="link"
                          size="xs"
                          colorScheme="blue"
                          onClick={() => vehicleopen(item)}
                        >
                          VIEW
                        </Button>
                      )}
                    </Td>
                    <Td textAlign="center">
                      {item.matchesstatus === "" ? (
                        <div>Pending</div>
                      ) : (
                        <div>{item.matchesstatus}</div>
                      )}
                    </Td>
                    <Td textAlign="center">
                      {item.matchesstatus === "" ? (
                        <Button
                          size="xs"
                          colorScheme="blue"
                          onClick={() => Matche(item)}
                        >
                          Interest
                        </Button>
                      ) : (
                        <Button
                          disabled
                          size="xs"
                          colorScheme="blue"
                          onClick={() => Matche()}
                        >
                          Interest
                        </Button>
                      )}
                    </Td> */}
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </div>

        <Modal isOpen={isBuyerDetails} onClose={isBuyerDetailsClose} size="xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Buyer Details</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="p-4">
                <>
                  <div className="border border-graycolor cursor-pointer">
                    <div className="grid grid-cols-6 px-4 px-1">
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Product Name
                      </div>
                      <div className="col-span-4 border-b p-1">
                        {BuyerData.product}
                      </div>
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Quality Range
                      </div>
                      <div className="col-span-2 border-b border-r p-1">
                        {BuyerData.minrange}
                      </div>
                      <div className="col-span-2 border-b p-1">
                        {BuyerData.maxrange}
                      </div>
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Landing Price
                      </div>
                      <div className="col-span-2 border-b border-r p-1">
                        {BuyerData.minprice}
                      </div>
                      <div className="col-span-2 border-b p-1">
                        {BuyerData.maxprice}
                      </div>
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Delivery Location
                      </div>
                      <div className="col-span-4 border-b p-1">
                        {BuyerData.deliverylocation}
                      </div>
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Estimate Delivery Date
                      </div>
                      <div className="col-span-4 border-b p-1">
                        {BuyerData.deliveryDate}
                      </div>
                      <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                        Estimate Delivery Time
                      </div>
                      <div className="col-span-4 border-b p-1">
                        {BuyerData.deliveryTime}
                      </div>
                      {BuyerData.status ? (
                        <>
                          <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                            Status
                          </div>
                          <div className="col-span-4 border-b p-1">
                            {BuyerData.status}
                          </div>
                          {BuyerData.status == "Accepted" ? (
                            <>
                              <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                                Accepted Reason
                              </div>
                              <div className="col-span-4 border-b p-1">
                                {BuyerData.statusAccept}
                              </div>
                              <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                                FeedBack
                              </div>
                              <div className="col-span-4 border-b p-1">
                                {BuyerData.statusAccept == "Requirement Alive"
                                  ? BuyerData.aliveFeedback == ""
                                    ? "null"
                                    : BuyerData.aliveFeedback
                                  : null}
                                {BuyerData.statusAccept == "Requirement dead"
                                  ? BuyerData.aliveFeedback == ""
                                    ? "null"
                                    : BuyerData.deadFeedback
                                  : null}
                                {BuyerData.statusAccept ==
                                "Requirement Alive with modification"
                                  ? BuyerData.aliveFeedback == ""
                                    ? "null"
                                    : BuyerData.modificationFeedback
                                  : null}
                              </div>
                            </>
                          ) : null}
                          {BuyerData.status == "CallBack" ? (
                            <>
                              <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                                Callback Reason
                              </div>
                              <div className="col-span-4 border-b p-1">
                                {BuyerData.reasonCallback}
                              </div>
                              {BuyerData.reasonCallback ==
                              "Answer to call later" ? (
                                <>
                                  <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                                    Back to Call
                                  </div>
                                  <div className="col-span-4 border-b p-1">
                                    {BuyerData.dateCallback.split("T")[0]}
                                  </div>
                                </>
                              ) : null}
                              <div className="col-span-2 text-blue-500 text-semibold border-r border-b border-graycolor p-1">
                                FeedBack
                              </div>
                              <div className="col-span-4 border-b p-1">
                                {BuyerData.feedbackCallback == ""
                                  ? "null"
                                  : BuyerData.feedbackCallback}
                              </div>
                            </>
                          ) : null}
                        </>
                      ) : null}
                    </div>
                  </div>
                </>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={isBuyerDetailsClose} colorScheme="red" mr={3}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={isvehicle} onClose={isvehicleclose} size="2xl">
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Vehicle Chosen</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* {distance != "" ? ( */}
              <div className="py-2 flex">
                <div className="px-1 font-semibold">Total Kilometers -</div>
                <div>{distancetonum}</div>
              </div>
              {/* // ) : null} */}
              {distancetonum && (
                <div className="border-gray-500 scroll-smooth border pb-5 overflow-y-scroll">
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
                        <Th>Vehicle Name</Th>
                        <Th>Capacity</Th>
                        <Th>Amount Per km</Th>
                        <Th>vehicle Amount</Th>
                        <Th>Total Amount</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      {data &&
                        data.map((item, index) => (
                          <Tr key={index}>
                            <Td>{index + 1}</Td>
                            <Td>{item.vname}</Td>
                            <Td>{item.capacity}</Td>
                            <Td>{item.amount}</Td>
                            <Td>{distancetonum * item.amount}</Td>
                            <Td>
                              {parseInt(
                                totalprice + distancetonum * item.amount
                              )}
                            </Td>
                            <Td></Td>
                          </Tr>
                        ))}
                    </Tbody>
                  </Table>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button onClick={isvehicleclose} colorScheme="blue" mr={3}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={islastTimeUpdatedQtyRange}
          onClose={isLastTimeUpdatedQtyRangeClose}
          size="2xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="border-gray-500 scroll-smooth border mt-2">
                <Table
                  size="sm"
                  scaleY="44"
                  variant="striped"
                  colorScheme="whatsapp"
                  className="overflow-auto"
                >
                  <Thead className="bg-headergreen text-center">
                    <Tr>
                      <Th textAlign="center">S.No</Th>
                      <Th textAlign="center">Supplier Name</Th>
                      <Th textAlign="center">Available Qty</Th>
                      <Th textAlign="center">Shortlisted Qty</Th>
                      <Th textAlign="center">Moderated Price</Th>
                      <Th textAlign="center">Total Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {EmployeeTable.rowData != "" ? null : (
                      <Tr>
                        <Td
                          style={{ textAlign: "center" }}
                          className="font-semibold"
                          colSpan="11"
                        >
                          No Data Found
                        </Td>
                      </Tr>
                    )}
                    {UpdateQty &&
                      UpdateQty.map((item, index) => (
                        <Tr colSpan="2" key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{item.date}</Td>
                          <Td>{item.time}</Td>
                          <Td>
                            {item.QtyMin}-{item.QtyMax}
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={isLastTimeUpdatedQtyRangeClose}
                colorScheme="blue"
                mr={3}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={islastTimeUpdatedPriceRange}
          onClose={isLastTimeUpdatedPriceRangeClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Updated Price Range</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="border-gray-500 scroll-smooth border">
                <Table
                  size="sm"
                  scaleY="44"
                  variant="striped"
                  colorScheme="whatsapp"
                  className="overflow-auto"
                >
                  <Thead className="bg-headergreen text-center">
                    <Tr>
                      <Th>S.No</Th>
                      <Th>Date</Th>
                      <Th>Time</Th>
                      <Th>Changed Price</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {EmployeeTable.rowData != "" ? null : (
                      <Tr>
                        <Td
                          style={{ textAlign: "center" }}
                          className="font-semibold"
                          colSpan="11"
                        >
                          No Data Found
                        </Td>
                      </Tr>
                    )}
                    {UpdatePrice &&
                      UpdatePrice.map((item, index) => (
                        <Tr colSpan="2" key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{item.date}</Td>
                          <Td>{item.time}</Td>
                          <Td>
                            {item.priceMin}-{item.priceMax}
                          </Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={isLastTimeUpdatedPriceRangeClose}
                colorScheme="blue"
                mr={3}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal
          isOpen={islastTimeUpdatedLocation}
          onClose={isLastTimeUpdatedLocationClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Updated Location List</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="border-gray-500 scroll-smooth border">
                <Table
                  size="sm"
                  scaleY="44"
                  variant="striped"
                  colorScheme="whatsapp"
                  className="overflow-auto"
                >
                  <Thead className="bg-headergreen text-center">
                    <Tr>
                      <Th>S.No</Th>
                      <Th>Date</Th>
                      <Th>Time</Th>
                      <Th>Location</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {EmployeeTable.rowData != "" ? null : (
                      <Tr>
                        <Td
                          style={{ textAlign: "center" }}
                          className="font-semibold"
                          colSpan="11"
                        >
                          No Data Found
                        </Td>
                      </Tr>
                    )}
                    {UpdateLocation &&
                      UpdateLocation.map((item, index) => (
                        <Tr colSpan="2" key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{item.date}</Td>
                          <Td>{item.time}</Td>
                          <Td>{item.deliveryLocation}</Td>
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={isLastTimeUpdatedLocationClose}
                colorScheme="blue"
                mr={3}
              >
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
        {/* <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Map View</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="flex justify-center text-center">
                <div className="object-cover h-48 w-96">
                  <LoadScript googleMapsApiKey="AIzaSyDoYhbYhtl9HpilAZSy8F_JHmzvwVDoeHI">
                    <GoogleMap
                      mapContainerStyle={mapStyles}
                      zoom={13}
                      center={{
                        lat: parseFloat(slat),
                        lng: parseFloat(slng),
                      }}
                    >
                      <Marker
                        position={{
                          lat: parseFloat(slat),
                          lng: parseFloat(slng),
                        }}
                      />
                    </GoogleMap>
                  </LoadScript>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose} colorScheme="blue" mr={3}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal> */}
        <Modal size="4xl" isOpen={matches} onClose={matcheslistclose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Matches Suppliers</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <div className="space-y-3">
                <div className="flex flex-row gap-2">
                  <div>{BuyerData.secretName}</div>
                  <div>
                    <label className="font-semibold">Name:</label>{" "}
                    {BuyerData.name}
                  </div>
                  <div>
                    <label className="font-semibold">Mobile No:</label>{" "}
                    {BuyerData.mobileNumber}
                  </div>
                </div>
                <div className="flex flex-row gap-2">
                  <div>
                    <label className="font-semibold">Price:</label>{" "}
                    {BuyerData.product}
                  </div>
                  <div>
                    <label className="font-semibold">Quantity:</label>{" "}
                    {BuyerData.minrange}-{BuyerData.maxrange}
                  </div>
                  <div>
                    <label className="font-semibold"> Price: </label>{" "}
                    {BuyerData.minprice}-{BuyerData.maxprice}
                  </div>
                  <div>
                    <label className="font-semibold"> Location: </label>{" "}
                    {BuyerData.deliverylocation}
                  </div>
                </div>
              </div>
              <div className="border-gray-500 scroll-smooth border mt-3">
                <Table
                  size="sm"
                  scaleY="44"
                  variant="striped"
                  colorScheme="whatsapp"
                  className="overflow-auto"
                >
                  <Thead className="bg-headergreen text-center">
                    <Tr>
                      <Th>S.No</Th>
                      <Th>Supplier Name</Th>
                      <Th>Quantity</Th>
                      <Th>Shortlisted qty</Th>
                      <Th>Moderate Price</Th>
                      <Th>total Price</Th>
                      <Th>Landing Price</Th>
                      <Th>Status</Th>
                      <Th>Action</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {matchesDetails != "" ? null : (
                      <Tr>
                        <Td
                          style={{ textAlign: "center" }}
                          className="font-semibold"
                          colSpan="11"
                        >
                          No Data Found
                        </Td>
                      </Tr>
                    )}
                    {matchesDetails &&
                      matchesDetails.map((item, index) => (
                        <Tr colSpan="2" key={index}>
                          <Td>{index + 1}</Td>
                          <Td>{item.secretName}</Td>
                          <Td>{item.expectedQnty}</Td>
                          <Td>{item.moderatedPrice}</Td>
                          <Td>{item.moderatedPrice}</Td>
                          <Td>{item.expectedQnty * item.moderatedPrice}</Td>
                          <Td>
                            <Button
                              variant="link"
                              size="xs"
                              colorScheme="blue"
                              onClick={() => vehicleopen(item)}
                            >
                              VIEW
                            </Button>
                          </Td>
                          <Td></Td>
                          <Td>
                            <Button
                              size="xs"
                              colorScheme="blue"
                              onClick={() => {
                                fixedTable(item.id);
                              }}
                            >
                              Fixed
                            </Button>
                          </Td>

                          {/* <Td>l</Td> */}
                          {/* <Td>
                            <Button
                              size="xs"
                              colorScheme="blue"
                              onClick={() => {
                                //setstatusname([...statusname, item.data._id]);
                                console.log(item.id);
                                saveinterest(item.id);
                                //streetChange();
                              }}
                            >
                              Interest
                            </Button>
                          </Td> */}
                          {/* {item.data.InterestStatus === "" ? (
                            <Td>Pending</Td>
                          ) : (
                            <Td>{item.data.InterestStatus}</Td>
                          )}
                          {item.data.InterestStatus === "" ? (
                            <Td>
                              <Button
                                size="xs"
                                colorScheme="blue"
                                // onClick={() => {
                                //   UpdatedQtyRangeList(item._id);
                                // }}
                              >
                                Interest
                              </Button>
                            </Td>
                          ) : (
                            <Td>
                              <Button
                                disabled
                                size="xs"
                                colorScheme="blue"
                                // onClick={() => {
                                //   UpdatedQtyRangeList(item._id);
                                // }}
                              >
                                Interest
                              </Button>
                            </Td>
                          )} */}
                        </Tr>
                      ))}
                  </Tbody>
                </Table>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button onClick={matcheslistclose} colorScheme="blue" mr={3}>
                Close
              </Button>
              {/* <Button
                //onClick={matcheslistclose}
                colorScheme="blue"
                // onClick={() => {
                //   saveinterest();
                // }}
              >
                save
              </Button> */}
            </ModalFooter>
          </ModalContent>
        </Modal>
        <Modal isOpen={fixed} onClose={fixedclose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Call Status</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Forms>
                <div className="grid items-center gap-2">
                  <div className="flex flex-row gap-2">
                    <label className="font-semibold ">Total Amount :</label>
                    {BuyerData.minrange}
                  </div>
                  <div className="flex flex-row gap-2">
                    <label className="font-semibold ">Payment Mode :</label>
                    {Details.expectedQnty}
                  </div>
                  <div className="flex flex-row gap-2">
                    <label className="font-semibold ">Pay To Be Amount :</label>
                    {Details.expectedQnty}
                  </div>
                  <div className="grid pb-2 gap-2">
                    <label className="font-semibold ">Pay to be Amount</label>
                    <InputFields
                      type="string"
                      name="shortlistedQty"
                      placeholder="Enter Shortlisted Quentity"
                      //   value={formik.values.shortlistedQty || ""}
                      //   onChange={formik.handleChange}
                      //   onBlur={formik.handleBlur}
                      className="input-primary"
                    />
                    {/* {formik.touched.advance && formik.errors.advance ? (
                      <FormikErrorMessage>
                        {formik.errors.advance}
                      </FormikErrorMessage>
                    ) : null} */}
                  </div>
                </div>
              </Forms>
            </ModalBody>
            <ModalFooter>
              <Button onClick={fixedclose} colorScheme="blue" mr={3}>
                Close
              </Button>
              <Button
                //onClick={UpdatedSupplierCallStatus}
                colorScheme="blue"
                mr={3}
              >
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </>
  );
};
export default AmountExecutive;