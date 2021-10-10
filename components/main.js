import { useState, useEffect } from "react";
import axios from "axios";
import Modal from 'react-bootstrap/Modal';
import ModalHeader from 'react-bootstrap/ModalHeader';
import ModalTitle from 'react-bootstrap/ModalTitle';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col, Card, ListGroup, ListGroupItem, OverlayTrigger, Popover } from "react-bootstrap";
import Header from "./header";
import useTranslation from "next-translate/useTranslation";



export default function Main(props) {

    /////// Variables ///////

    const [showModal, setShowModal] = useState(false) // a flag for add item popup form
    const [showUpdate, setShowUpdate] = useState(false) // a flag for update item popup form
    const [updateId, setUpdateId] = useState(0) // to be used in the put request
    const [deleteId, setDeleteId] = useState(0) // to be used in the delete request
    const [addData, setAddData] = useState({
        title: '',
        price: '',
        description: '',
        image: '',
        category: ''
    }) // to be filled with the data coming from add item form for post request

    const [products, setProducts] = useState([{
        "id": 4,
        "title": "Mens Casual Slim Fit",
        "price": '15.99',
        "description": "The color could be slightly different between on the screen and in practice. / Please note that body builds vary by person, therefore, detailed size information should be reviewed below on the product description.",
        "category": "men's clothing",
        "image": "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
    }]) // to save the products from the api get request to be rendered 

    const [addedItem, setAddedItem] = useState([{
        "id": 0,
        "title": "",
        "price": "",
        "description": "",
        "category": "",
        "image": "",
    }]) // takes the response from the post request

    const [updateItem, setUpdateItem] = useState(
        {
            "id": 0,
            "title": "",
            "price": "",
            "description": "",
            "category": "",
            "image": "",
        }
    ) // to take the update item info for put request

    let { t } = useTranslation() // for translation

    ///////async functions///////

    async function getData() {

        // get request

        const url = 'https://fakestoreapi.com/products';
        const response = axios.get(url);
        console.log(await response);
        return await response
    }

    async function addItem(data) {

        // post request

        const url = 'https://fakestoreapi.com/products';
        const response = axios.post(url, data)
        return await response
    }

    async function updateData(data) {

        // put request
        
        const url = `https://fakestoreapi.com/products/${updateId}`;
        const response = axios.put(url, data);
        return await response
    }



    ///////useEffect///////

    useEffect(() => {
        async function fetchData() {
            const response = await getData();
            setProducts(response.data)
        }
        fetchData();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const response = await addItem(addData);
            setAddedItem([response.data])
        }
        fetchData();
    }, [addData]);


    useEffect(() => {
        async function fetchData() {
            const response = await updateData(updateItem);
            console.log(response.data)
        }
        fetchData();
    });
    

    function handleDelete(e) {

        // sets the delete id for deleting a product

        e.preventDefault()
        setDeleteId(e.target.id)
        alert(t("common:deletedAnItem"))
    }
    
    useEffect(() => {
        async function deleteItem() {
            const url = `https://fakestoreapi.com/products/${deleteId}`;
            const response = await axios.delete(url);
            return response;
        }

        async function fetchData() {
            const response = await deleteItem();
            console.log(response.data);
        }
        fetchData()
    }, [deleteId])

    /////// event handlers/////// 

    function handleShow(e) {

        // to show the add item modal when add item button is clicked

        setShowModal(true)
    }

    function handleClose() {

        // to hide the open modal when closed

        setShowModal(false)
    }

    function handleCloseUpdate() {

        // to hide update modal when it is closed

        setShowUpdate(false)
    }

    function handleAdd(e) {

        // to get the data from add item form for adding a new item (post request)

        e.preventDefault();
        setAddData({
            title: e.target[0].value,
            price: e.target[1].value,
            description: e.target[3].value,
            image: e.target[4].value,
            category: e.target[2].value
        })
        console.log(addedItem);
        setShowModal(false)
        alert(t("common:addedAnItem"))

    }

    function handleUpdate(e) {

        // to show update form modal, and decide the id of product to be updated

        e.preventDefault()
        setShowUpdate(true)
        setUpdateId(e.target.id)
    }

    function handleUpdateSubmit(e) {

        // Takes the values for put request from update form

        e.preventDefault();
        setUpdateItem({
            title: e.target[0].value,
            price: e.target[1].value,
            description: e.target[3].value,
            image: e.target[4].value,
            category: e.target[2].value
        })
        setShowUpdate(false)
        alert(t("common:UpdatedAnItem"))

    }

    


    return (
        <>

            <Header name={props.user} />

            <Modal show={showModal} onHide={handleClose}>
                <ModalHeader closeButton closeLabel="">
                    <ModalTitle>{t("common:addProduct")}</ModalTitle>
                </ModalHeader>
                <Modal.Body>
                    <Form onSubmit={handleAdd}>
                        <Form.Group as={Col} controlId="formGridTitle">
                            <Form.Label>{t("common:Title")}</Form.Label>
                            <Form.Control type="text" placeholder={t("common:ItemTitle")} />
                        </Form.Group>

                        <Form.Group as={Col} controlId="formGridPrice">
                            <Form.Label>{t("common:price")}</Form.Label>
                            <Form.Control type="text" placeholder={t("common:price")} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridCategory">
                            <Form.Label>{t("common:category")}</Form.Label>
                            <Form.Control placeholder={t("common:category")} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridDescription">
                            <Form.Label>{t("common:description")}</Form.Label>
                            <Form.Control type="text" placeholder={t("common:add") + " " + t("common:description")} />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formGridImage">
                            <Form.Label>{t("common:Image")}</Form.Label>
                            <Form.Control type="text" placeholder={t("common:addImgUrl")} />
                        </Form.Group>

                        <Button variant="primary" type="submit">
                            {t("common:submit")}
                        </Button>
                    </Form>
                </Modal.Body>
            </Modal>
            <div className="container">
                <div className="row">
                    <div className="text-center col">
                        <Button onClick={handleShow} className="mt-5">{t("common:addItem")}</Button>
                    </div>
                </div>
            </div>

            <div className="container flex-wrap p-2 mb-3 d-flex bd-highlight">
                {
                    products.map(product => (
                        <div key={product.id} className="m-5 overflow-auto">
                            <Card style={{ width: '18rem', height: '45rem' }}>
                                <Card.Img variant="top" src={product.image} className="img-thumbnail" style={{ maxHeight: '24rem' }} />
                                <Card.Body>
                                    <Card.Title>{product.title}</Card.Title>
                                    <OverlayTrigger
                                        trigger="click"
                                        overlay={
                                            <Popover id={`popover-positioned-${product.id}`}>
                                                {product.description}
                                            </Popover>
                                        }
                                    >
                                        <Button variant="secondary">{t("common:description")}</Button>
                                    </OverlayTrigger>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>{t("common:price")}: {product.price}</ListGroupItem>
                                    <ListGroupItem>{t("common:category")}: {product.category}</ListGroupItem>
                                </ListGroup>
                                <Card.Footer>
                                    <div className="gap-2 d-grid stick-bottom">
                                        <Button size="sm" id={product.id} onClick={handleUpdate}>{t("common:updateItem")}</Button>
                                        <Button size="sm" id={product.id} onClick={handleDelete}>{t("common:deleteItem")}</Button>
                                    </div>
                                </Card.Footer>
                            </Card>
                        </div>
                    ))
                }
            </div>

            <Modal show={showUpdate} onHide={handleCloseUpdate}>
                <Modal.Header closeButton closeLabel="">
                    <Modal.Title>{t("common:updateProduct")}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        products.map(product => (

                            parseInt(updateId) === product.id &&

                            <Form onSubmit={handleUpdateSubmit} key={product.id}>
                                <Form.Group as={Col} controlId="formGridTitle">
                                    <Form.Label>{t("common:Title")}</Form.Label>
                                    <Form.Control type="text" defaultValue={product.title} />
                                </Form.Group>

                                <Form.Group as={Col} controlId="formGridPrice">
                                    <Form.Label>{t("common:price")}</Form.Label>
                                    <Form.Control type="text" defaultValue={product.price} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridCategory">
                                    <Form.Label>{t("common:category")}</Form.Label>
                                    <Form.Control defaultValue={product.category} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridDescription">
                                    <Form.Label>{t("common:description")}</Form.Label>
                                    <Form.Control type="text" defaultValue={product.description} />
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="formGridImage">
                                    <Form.Label>{t("common:Image")}</Form.Label>
                                    <Form.Control type="text" defaultValue={product.image} />
                                </Form.Group>

                                <Button variant="primary" type="submit">
                                    {t("common:submit")}
                                </Button>
                            </Form>
                        ))
                    }
                </Modal.Body>
            </Modal>

        </>

    )

}