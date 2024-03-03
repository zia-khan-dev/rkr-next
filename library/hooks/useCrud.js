import { useState, useCallback } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { useRouter } from 'next/router';

const useCrud = (
  apiUrl,
  methodType,
  optionalSuccessRoute,
  successMessage = 'successfully!', 
  optionalAuthMiddleware,
  errorMessage = 'Something went wrong!'
) => {
  const [crudState, setCrudState] = useState({
    data: null,
    error: null,
    loading: false,
  });

  const router = useRouter();

  const callApi = useCallback(async (body, onSuccess, onError) => {
    NProgress.start();
    setCrudState(prevState => ({ ...prevState, loading: true }));
  
    const headers = {
      "Content-Type": "application/json",
      ...(optionalAuthMiddleware && optionalAuthMiddleware()),
    };
  
    try {
      const config = {
        method: methodType,
        url: apiUrl,
        headers,
        ...(methodType === "POST" || methodType === "PUT") && { data: JSON.stringify(body) },
      };
  
      const response = await axios(config);
  
      setCrudState({ data: response.data, error: null, loading: false });
      NProgress.done();
  
      // Dynamically determine the icon and title based on the response data
      const icon = response.data.success ? "success" : "error";
      const title = response.data.success ? "Success" : "Error";
      const text = response.data.message || (response.data.success ? successMessage : errorMessage);
  
      // Show Swal based on the success flag in the response
      await Swal.fire({
        icon: icon,
        title: title,
        text: text,
      });
  
      if (response.data.success) {
        // Execute onSuccess callback if provided and the operation was successful
        onSuccess && onSuccess(response.data);
        // Optional route navigation after success
        if (optionalSuccessRoute) {
          router.push(optionalSuccessRoute);
        }
      } else {
        // Execute onError callback if provided and the operation was not successful
        onError && onError(response.data);
      }
    } catch (err) {
      setCrudState({ data: null, error: err, loading: false });
      NProgress.done();
  
      const errorText = err.response && err.response.data && err.response.data.message ? err.response.data.message : errorMessage;
      // Show Swal for unexpected errors
      Swal.fire({
        icon: "error",
        title: "Error",
        text: errorText,
      });
  
      // Execute onError callback if provided
      onError && onError(err.response ? err.response.data : null);
    }
  }, [apiUrl, methodType, optionalAuthMiddleware, optionalSuccessRoute, router, successMessage, errorMessage]);
  

  return { ...crudState, callApi };
};

export default useCrud;
