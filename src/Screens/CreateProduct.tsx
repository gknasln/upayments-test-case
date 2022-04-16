
import React, { useEffect, useState } from 'react'; 
import { useNavigate } from 'react-router-dom';
import Button from '../Components/Button';

import Input from '../Components/Input';
import Loading from '../Components/Loading';
import Select from '../Components/Select';
import TextArea from '../Components/Textarea';

import handleError from '../Helpers/errorHandler';
import UPaymentService from '../service';

export interface ICrateProductProps {}

const CreateProduct: React.FunctionComponent<ICrateProductProps> = props => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);
  const [attempted, setAttempted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [price, setPrice] = useState("");

  useEffect(() => {
    UPaymentService.getCategories()
    .then(data => {
      setCategories(data);
      setSelectedCategory(data[0].value);
      setLoading(false);
    })
    .catch(handleError)
  }, []); 


  function validate() {
    return (
      name.length > 0 &&
      description.length > 0 && 
      imageUrl.length > 0 &&
      imageUrl.startsWith("http") &&
      price.length > 0 &&
      selectedCategory
    );
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    event.stopPropagation();
    setAttempted(true);

    if(!validate()) return;

    setLoading(true);
    UPaymentService.post("products", {
      name,
      description,
      price,
      category: selectedCategory,
      avatar: imageUrl,
      developerEmail: "gknasln@gmail.com"
    })
    .then(res => {
      navigate("/");
    })
    .catch(handleError)
    .finally(() => setLoading(false));

    

  }

  if(loading)
    return <Loading />

  return (
    <div className='container'>
      <h1 className='text-2xl font-medium text-center mb-6' > Create Product</h1>
      <form 
        className='max-w-md m-auto'
        onSubmit={handleSubmit}
      >
        <Input
          value={name}
          onChange={setName}
          placeholder="Product name"
          className='mb-6'
          warn={attempted && name.length < 2}
          warning="Please enter a product name"
        />
        <TextArea
          value={description}
          onChange={setDescription}
          placeholder="Description"
          className='mb-6'
          warn={attempted && description.length < 2}
          warning="Please enter description"
        />
        <Input
          value={imageUrl}
          onChange={setImageUrl}
          placeholder="Image URL"
          className='mb-6'
          warn={attempted && !imageUrl.startsWith("http")}
          warning={"Please enter a valid image url"}
        />
        <Select
          value={selectedCategory}
          onChange={setSelectedCategory}
          options={categories}
          className="mb-6"
        />
        <Input
          value={price}
          onChange={setPrice}
          placeholder="Price"
          className='mb-6'
          warn={attempted && price.length < 2}
          warning={"Please enter product's price"}
        />
        <Button
          title={"SUBMIT"}
        />
      </form>
    </div>
  )
}

export default CreateProduct;
 