

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Allquestions.css';
import { Link, useParams } from 'react-router-dom';
import { BASEDIR } from '../../constant/Links';

const Allquestions = () => {
  const [time, setTime] = useState({
    days: '',
    hours: '',
    min: '',
    seconds: ''
  });

  const [questions, setQuestions] = useState([]);
  const [category, setCategory] = useState({});
  const [endTime, setEndTime] = useState('2024-08-11,17:00:00');

  const { categoryName } = useParams();

  useEffect(() => {
    const getCategory = async () => {
      try {
        console.log('Fetching category data...');
        const categoryResponse = await axios.get(`${BASEDIR}/category/${categoryName}`);
        console.log('Category Response:', categoryResponse);

        const categoryData = categoryResponse.data.message;
        setCategory(categoryData);
        console.log('Category Data:', categoryData); // Log category data

        // Use the correct property name: categoryId instead of categoryID
        console.log(`Fetching questions for category ID: ${categoryData.categoryId}...`);
        const questionsResponse = await axios.get(`${BASEDIR}/problem/category/${categoryData.categoryId}`);
        console.log('Questions Response:', questionsResponse);

        const questionsData = questionsResponse.data.message;
        setQuestions(questionsData);
        console.log('Questions Data:', questionsData); // Log questions data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getCategory();
  }, [categoryName]);

  useEffect(() => {
    const interval = setInterval(() => {
      var countDownDate = new Date(`${endTime}`).getTime();
      var now = new Date().getTime();
      var distance = countDownDate - now;

      var days1 = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours1 = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes1 = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds1 = Math.floor((distance % (1000 * 60)) / 1000);

      setTime({
        days: isNaN(days1) ? '0' : days1,
        hours: isNaN(hours1) ? '0' : hours1,
        min: isNaN(minutes1) ? '0' : minutes1,
        seconds: isNaN(seconds1) ? '0' : seconds1
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return (
    <>
      <div className="aq_box1">
        <div className="aq_box2">
          <img style={{ width: '100%', height: '230px' }} src={category.imageLink} alt={category.categoryName} />
          <h3 className="aq_heading">{category.categoryName} Top Interview Questions</h3>

          <table id="aq_table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Code</th>
                <th>Difficulty</th>
                <th>Accuracy</th>
              </tr>
            </thead>
            <tbody>
              {questions.length > 0 ? (
                questions.map((question, index) => (
                  <tr key={index}>
                    <td className="fancy">
                      <Link to={`contest/problem/${question.problemName}/${question.problemCode}`} style={{ textDecoration: 'none', color: '#3b5998' }}>
                        {question.problemName}
                      </Link>
                    </td>
                    <td className="fancy">{question.problemCode}</td>
                    <td>{question.difficulty}</td>
                    <td className="fancy">66.66</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>
                    No questions available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h4 className="color_heading">ANNOUNCEMENTS</h4>
          <p className="aq_text">
            <b>4th Oct 13:10 IST:</b> Problem <b>HIDDENPTS</b> has been added.
          </p>
          <p className="aq_text">
            <b>3rd Oct 20:00 IST:</b> In Problem <b>OLYMRANK,</b> you can choose at most K medals and change their color. The same has been updated in the problem statement.
          </p>
          <p className="aq_text">
            <b>1st Oct 17:20 IST:</b> Problem <b>OLYMRANK</b> has been added.
          </p>
          <p className="aq_text">
            <b>1st Oct 15:00 IST:</b> We will be adding two more problems to the contest.
          </p>
        </div>

        <div className="aq_box3">
          <div className="aq_right_box_1">
            <div className="aq_heading2">
              <h2>Contest Ends In</h2>
            </div>

            <div className="timer">{time.days}</div>
            <div className="timer">{time.hours}</div>
            <div className="timer">{time.min}</div>
            <div className="timer">{time.seconds}</div>
          </div>

          <div className="aq_right_box_1">
            <div className="aq_heading2">
              <h2>Contest Ranks</h2>
            </div>
            <button type="submit" className="button">
              Go to Contest Ranks
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Allquestions;
