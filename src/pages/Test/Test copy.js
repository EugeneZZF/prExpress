import React, { useEffect, useState } from 'react';
import styles from './Test.module.css';
import {
  CoreResourceServiceClient,
  CreateResourceRequest
} from "../../generated/resource_grpc_web_pb";
import { CoreCategoryServiceClient } from '../../generated/category_grpc_web_pb';
import { WpCategory, WpAuthRequest, WpCategoriesResponse, CreateCategoryRequest} from '../../generated/category_pb';

const accesskey = localStorage.getItem("tokenKey");
export default function Test() {
  
  const clientResource = new CoreResourceServiceClient(
    "https://core.prexpress.pro/",
    null,
    null
  );
  const client = new CoreCategoryServiceClient(
    "https://core.prexpress.pro/",
    null,
    null
  );

  
  const [categories, setCategories] = useState([]);

  // Создаем запрос для аутентификации
  useEffect(() => {
    const request = new WpAuthRequest();
    request.setLogin('yourLogin');
    request.setPassword('yourPassword');
    request.setUri('http://yourwordpresssite.com');

    const metadata = {
      'Authorization': `Bearer ${accesskey}`, // Используйте правильный токен
    };

    client.getWpCategoriesInResource(request, metadata, (err, response) => {
      if (err) {
        console.error('Ошибка синхронизации категорий:', err);
        return;
      }

      const synchronizedCategories = response.getCategoriesList().map(category => category.toObject());
      setCategories(synchronizedCategories);
      // console.log('Категории синхронизированы:', synchronizedCategories);
    });
  }, [client, accesskey]);

  const addCategory = () =>{
    const request = new CreateCategoryRequest();
    request.setName(resourceName);
    request.setCategories(

    );
    request.setUri();

    const metadata ={
      'Authorization': `Bearer ${accesskey}`,      
    };

    clientResource.createResource(request, metadata, (err, response) => {
      if(err){
        console.error("error" , err);
        return;
      }
      const createdCategory = response.toObject();
      
    })
  }


  const [resourceLanguage, setResourceLanguage] = useState("russian");
  const [resourceName, setResourceName] = useState("name");
  const [resourceUri, setResourceUri] = useState("2.com");
  const [resourceDescription, setResourceDescription] = useState("Description");
  const [resourceWalletId, setResourceWalletId] = useState("usdt_trc20");
  const [resourcePrice, setResourcePrice] = useState("21");
  const [resourceLogin, setResourceLogin] = useState("token");
  const [resourcePassword, setResourcePassword] = useState("login");
  const [errors, setErrors] = useState({});
  
  const [checkboxes, setCheckboxes] = useState({
    all: false,
    category1: false,
    category2: true,
    category3: false,
    category4: false,
  });

 
  const validateInputs = () => {
    const errors = {};
    if (!resourceName) errors.resourceName = "Resource name is required";
    if (!resourceUri) errors.resourceUri = "Resource URI is required";
    if (!resourceDescription)
      errors.resourceDescription = "Resource description is required";
    if (!resourceLogin) errors.resourceLogin = "Resource login is required";
    if (!resourcePassword)
      errors.resourcePassword = "Resource password is required";
    return errors;
  };

  // const handleCreateResource = async (e) => {
  //   e.preventDefault();
  //   const inputErrors = validateInputs();

  //   if (Object.keys(inputErrors).length === 0) {
  //     try {
  //       const request = new CreateResourceRequest();
  //       request.setName(resourceName);
  //       request.setDescription(resourceDescription);
  //       request.setLanguage(resourceLanguage === "russian" ? 0 : 1);
  //       request.setUri(resourceUri);
  //       request.setLogin(resourceLogin);
  //       request.setPassword(resourcePassword);
  //       request.setPrice(resourcePrice);
  //       request.setWalletid(resourceWalletId);
        
  //       categories.forEach(categoryData => {
  //         if (checkboxes[categoryData.name]) {
  //           const category = new WpCategory();
  //           category.setCategoryid(categoryData.categoryId);
  //           category.setName(categoryData.name);
  //           category.setDescription(categoryData.description);
  //           category.setLink(categoryData.link);
  //           request.addCategories(category);
  //         }
  //       });

  //       const metadata = {
  //         Authorization: `Bearer ${accesskey}`,
  //       };

  //       const response = await new Promise((resolve, reject) => {
  //         clientResource.createResource(request, metadata, (err, response) => {
  //           if (err) {
  //             reject(err);
  //           } else {
  //             resolve(response);
  //           }
  //         });
  //       });

  //       const responseObject = response.toObject
  //         ? response.toObject()
  //         : response;
  //       console.log("Resource creation successful: ", responseObject);
  //     } catch (err) {
  //       console.error(`Resource creation failed: ${err.message}`);
  //     }
  //   } else {
  //     setErrors(inputErrors);
  //   }
  // };

  return (
    <div className={styles.cont}>
      <button className={styles.btn} > CLICK </button>
      <button className={styles.btn} > CLICK2 </button>
      <button className={styles.btn} > CLICK3 </button>
      <div className={styles.response_st}></div>
      <div>
        {categories.map(category => (
          <div key={category.name}>
            <input 
              type="checkbox"
              checked={checkboxes[category.name]}
              onChange={(e) => setCheckboxes({
                ...checkboxes,
                [category.name]: e.target.checked
              })}
            />
            <label>{category.name}</label>
          </div>
        ))}
      </div>
    </div>
  );
}