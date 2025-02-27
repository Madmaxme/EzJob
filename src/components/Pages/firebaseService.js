// We're assuming firebase is already initialized in your app
// This file handles Firestore operations for the waitlist surveys

import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase/firebase'; // Updated path to match your project structure

// Submit job seeker survey to Firestore
export const submitJobSeekerSurvey = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "waitlist_job_seekers"), {
      ...data,
      submittedAt: serverTimestamp()
    });
    console.log("Job seeker survey submitted with ID: ", docRef.id);
    return {
      success: true,
      message: "Thank you for your submission!",
      id: docRef.id
    };
  } catch (error) {
    console.error("Error submitting job seeker survey: ", error);
    return {
      success: false,
      message: "There was an error submitting your survey. Please try again.",
      error
    };
  }
};

// Submit job offerer survey to Firestore
export const submitJobOffererSurvey = async (data) => {
  try {
    const docRef = await addDoc(collection(db, "waitlist_job_offerers"), {
      ...data,
      submittedAt: serverTimestamp()
    });
    console.log("Job offerer survey submitted with ID: ", docRef.id);
    return {
      success: true,
      message: "Thank you for your submission!",
      id: docRef.id
    };
  } catch (error) {
    console.error("Error submitting job offerer survey: ", error);
    return {
      success: false,
      message: "There was an error submitting your survey. Please try again.",
      error
    };
  }
};

// Add email to waitlist
export const addToWaitlist = async (email, userType) => {
  try {
    const docRef = await addDoc(collection(db, "waitlist"), {
      email,
      userType,
      joinedAt: serverTimestamp()
    });
    console.log("Email added to waitlist with ID: ", docRef.id);
    return {
      success: true,
      message: "You've been added to our waitlist!",
      id: docRef.id
    };
  } catch (error) {
    console.error("Error adding to waitlist: ", error);
    return {
      success: false,
      message: "There was an error adding you to our waitlist. Please try again.",
      error
    };
  }
};