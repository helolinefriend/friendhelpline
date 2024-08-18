

'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../../../admincss/HomeSettings.module.css';
import Homee from "../../../../components/topnavbar/Home"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomeSettings() {
  const [homeData, setHomeData] = useState({
    title: '',
    subtitle: '',
    subtitle1: '',
    subtitle2: '',
    subtitle3: '',
    subtitle4: '',
    subtitle5: '',
    subtitle6: '',
    subtitle7: '',
    subtitle8: '',
    subtitle9: '',
    subtitle10: '',
    subtitle11: '',
    subtitle12: '',
    subtitle13: '',
    subtitle14: '',
    subtitle15: '',
    subtitle16: '',
    subtitle17: '',
    subtitle18: '',
    subtitle19: '',
    subtitle20: '',
    subtitle21: '',
    subtitle22: '',
    subtitle23: '',
    subtitle24: '',
    subtitle25: '',
    subtitle26: '',
    subtitle27: '',
    subtitle28: '',
    subtitle29: '',
    subtitle30: '',
    subtitle31: '',
    subtitle32: '',
    subtitle33: '',
    subtitle34: '',
    subtitle35: '',
    subtitle36: '',
    subtitle37: '',
    subtitle38: '',
    subtitle39: '',
    subtitle40: '',
    subtitle41: '',
    subtitle42: '',
    subtitle43: '',
    subtitle44: '',
    subtitle45: '',
    subtitle46: '',
    subtitle47: '',
    subtitle48: '',
    subtitle49: '',
    subtitle50: '',
    imageUrl: '',
    imageUrl1: '',
    imageUrl2: '',
    imageUrl3: '',
    imageUrl4: '',
    imageUrl5: '',
    imageUrl6: '',
    imageUrl7: '',
    imageUrl8: '',
  });


  // 46 home page subtitle 
  // 4 for images ok

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const response = await axios.get('/api/admin/home');
        setHomeData(response.data);
      } catch (err) {
        toast.error('Error fetching home data plase reload the page..|');
        console.error('Error fetching home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setHomeData((prev) => ({
      ...prev,
      [name]: value
    }));
  };



  const handleSave = async () => {
    // toast.success('Saving home data: successfully!');
    console.log('Saving home data:', homeData); // Add this line to inspect the payload
    try {
      const response = await axios.put('/api/admin/home', homeData);
      if (response.status === 200) {
        toast.success('Home page data updated successfully');
        
      } else {
        toast.error('Failed to update home page data');      
      }
    } catch (err) {
      console.error('Error updating home data:', err);
      toast.error('Failed to update home page data');
      alert('Failed to update home page data');
    }
  };

  

  if (loading) return <p>Loading...</p>;


  // <div className={styles.HomePreview}>
  // <Homee />
  // </div>

  return (
    <div className={styles.homeSettings}>
      <h1>Edit Home Page</h1>
         <div className={styles.formSection}>

        <div className={styles.inputGroup}>
          <p>
            <strong>Title:</strong>
            <input
              type="text"
              name="title"
              value={homeData.title || ''}
              onChange={handleChange}
              className={styles.inputField}
            />
          </p>


          <p>
            <strong>Subtitle:</strong>
            <input
              type="text"
              name="subtitle"
              value={homeData.subtitle || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>

          <p>
            <strong>Heading:</strong>
            <input
              type="text"
              name="subtitle1"
              value={homeData.subtitle1 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>

          <p>
            <strong>Heading description:</strong>
            <input
              type="text"
              name="subtitle2"
              value={homeData.subtitle2 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>

          <p>
            <strong>Register:</strong>
            <input
              type="text"
              name="subtitle3"
              value={homeData.subtitle3 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Login:</strong>
            <input
              type="text"
              name="subtitle4"
              value={homeData.subtitle4 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Section 2 small title </strong>
            <input
              type="text"
              name="subtitle5"
              value={homeData.subtitle5 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Section 2 description</strong>
            <input
              type="text"
              name="subtitle6"
              value={homeData.subtitle6 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button1:</strong>
            <input
              type="text"
              name="subtitle7"
              value={homeData.subtitle7 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button2:</strong>
            <input
              type="text"
              name="subtitle8"
              value={homeData.subtitle8 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button3:</strong>
            <input
              type="text"
              name="subtitle9"
              value={homeData.subtitle9 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button4:</strong>
            <input
              type="text"
              name="subtitle10"
              value={homeData.subtitle10 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button5:</strong>
            <input
              type="text"
              name="subtitle11"
              value={homeData.subtitle11 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button6:</strong>
            <input
              type="text"
              name="subtitle12"
              value={homeData.subtitle12 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button7:</strong>
            <input
              type="text"
              name="subtitle13"
              value={homeData.subtitle13 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button8:</strong>
            <input
              type="text"
              name="subtitle14"
              value={homeData.subtitle14 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button9:</strong>
            <input
              type="text"
              name="subtitle15"
              value={homeData.subtitle15 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button10:</strong>
            <input
              type="text"
              name="subtitle16"
              value={homeData.subtitle16 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button11:</strong>
            <input
              type="text"
              name="subtitle17"
              value={homeData.subtitle17 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Button12:</strong>
            <input
              type="text"
              name="subtitle18"
              value={homeData.subtitle18 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
      
          <p>

            <strong>Section 3 Title</strong>
            <input
              type="text"
              name="subtitle19"
              value={homeData.subtitle19 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Section 3 description</strong>
            <input
              type="text"
              name="subtitle20"
              value={homeData.subtitle20 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>




{/* add more input for home extra ok update api and this page */}


{/*new add */} 


<p>
<strong>Button9:</strong>
<input
  type="text"
  name="subtitle21"
  value={homeData.subtitle21 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button10:</strong>
<input
  type="text"
  name="subtitle22"
  value={homeData.subtitle22 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button11:</strong>
<input
  type="text"
  name="subtitle23"
  value={homeData.subtitle23 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button12:</strong>
<input
  type="text"
  name="subtitle24"
  value={homeData.subtitle24 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>

<p>

<strong>Section 3 Title</strong>
<input
  type="text"
  name="subtitle25"
  value={homeData.subtitle25 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Section 3 description</strong>
<input
  type="text"
  name="subtitle26"
  value={homeData.subtitle26 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>


<p>
<strong>Button9:</strong>
<input
  type="text"
  name="subtitle27"
  value={homeData.subtitle27 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button10:</strong>
<input
  type="text"
  name="subtitle28"
  value={homeData.subtitle28 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button11:</strong>
<input
  type="text"
  name="subtitle29"
  value={homeData.subtitle29 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button12:</strong>
<input
  type="text"
  name="subtitle30"
  value={homeData.subtitle30 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>

<p>

<strong>Section 3 Title</strong>
<input
  type="text"
  name="subtitle31"
  value={homeData.subtitle31 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Section 3 description</strong>
<input
  type="text"
  name="subtitle32"
  value={homeData.subtitle32 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>

<p>
<strong>Button9:</strong>
<input
  type="text"
  name="subtitle33"
  value={homeData.subtitle33 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button10:</strong>
<input
  type="text"
  name="subtitle34"
  value={homeData.subtitle34 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button11:</strong>
<input
  type="text"
  name="subtitle35"
  value={homeData.subtitle35 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button12:</strong>
<input
  type="text"
  name="subtitle36"
  value={homeData.subtitle36 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>

<p>

<strong>Section 3 Title</strong>
<input
  type="text"
  name="subtitle37"
  value={homeData.subtitle37 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Section 3 description</strong>
<input
  type="text"
  name="subtitle38"
  value={homeData.subtitle38 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>

<p>
<strong>Button9:</strong>
<input
  type="text"
  name="subtitle39"
  value={homeData.subtitle39 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button10:</strong>
<input
  type="text"
  name="subtitle40"
  value={homeData.subtitle40 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button11:</strong>
<input
  type="text"
  name="subtitle41"
  value={homeData.subtitle41 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button12:</strong>
<input
  type="text"
  name="subtitle42"
  value={homeData.subtitle42 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>

<p>

<strong>Section 3 Title</strong>
<input
  type="text"
  name="subtitle43"
  value={homeData.subtitle43 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Section 3 description</strong>
<input
  type="text"
  name="subtitle44"
  value={homeData.subtitle44 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>

<p>
<strong>Button9:</strong>
<input
  type="text"
  name="subtitle45"
  value={homeData.subtitle45 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button10:</strong>
<input
  type="text"
  name="subtitle46"
  value={homeData.subtitle46 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button11:</strong>
<input
  type="text"
  name="subtitle47"
  value={homeData.subtitle47 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Button12:</strong>
<input
  type="text"
  name="subtitle48"
  value={homeData.subtitle48 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>

<p>

<strong>Section 3 Title</strong>
<input
  type="text"
  name="subtitle49"
  value={homeData.subtitle49 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>
<p>
<strong>Section 3 description</strong>
<input
  type="text"
  name="subtitle50"
  value={homeData.subtitle50 || ''}
  onChange={handleChange} className={styles.inputField}
/>
</p>



          <p>
            <strong>Image URL:</strong>
            <input
              type="text"
              name="imageUrl"
              value={homeData.imageUrl || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>

          <p>
            <strong>Image URL:</strong>
            <input
              type="text"
              name="imageUrl1"
              value={homeData.imageUrl2 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Image URL:</strong>
            <input
              type="text"
              name="imageUrl2"
              value={homeData.imageUrl2 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Image URL:</strong>
            <input
              type="text"
              name="imageUrl3"
              value={homeData.imageUrl3 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Image URL:</strong>
            <input
              type="text"
              name="imageUrl4"
              value={homeData.imageUrl4 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Image URL:</strong>
            <input
              type="text"
              name="imageUrl5"
              value={homeData.imageUrl5 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Image URL:</strong>
            <input
              type="text"
              name="imageUrl6"
              value={homeData.imageUrl6 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Image URL:</strong>
            <input
              type="text"
              name="imageUrl7"
              value={homeData.imageUrl7 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>
          <p>
            <strong>Image URL:</strong>
            <input
              type="text"
              name="imageUrl8"
              value={homeData.imageUrl8 || ''}
              onChange={handleChange} className={styles.inputField}
            />
          </p>

        </div>
        <button onClick={handleSave} className={styles.saveButton}>
          Save Changes
        </button>

         </div>

        
      </div>
  );
}











