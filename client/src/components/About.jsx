import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 animate-gradient bg-[length:200%_200%] flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-6 sm:p-8 md:p-10 lg:p-12 rounded-lg shadow-lg max-w-md sm:max-w-lg md:max-w-xl lg:max-w-2xl w-full mx-4">
        <h2 className="text-xl sm:text-2xl font-bold my-2 bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-500 to-yellow-500">
          About NoteBox
        </h2>
        <p className="mb-4 text-base sm:text-lg">
          Welcome to LoferNotes, your go-to platform for easy note-taking!
          With LoferNotes, you can effortlessly manage your notes, whether it's creating new ones, editing existing ones, or deleting them when you no longer need them.
        </p>
        <p className="text-xl sm:text-2xl my-2 font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-blue-500 to-yellow-500">
          <strong>Key Features:</strong>
        </p>
        <ul className="list-disc text-base sm:text-lg list-inside mb-4">
          <li>Create new notes and jot down your thoughts.</li>
          <li>Edit notes to keep your information.</li>
          <li>Delete notes you no longer need, maintaining a clutter-free environment.</li>
          <li>Your notes are securely saved in the cloud, ensuring access from any device.</li>
        </ul>
        <p className="text-lg sm:text-xl font-bold">
          Get started today and experience the simplicity and convenience of LoferNotes!
        </p>
      </div>
    </div>
  );
};

export default About;
