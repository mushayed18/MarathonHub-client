const UserExperience = () => {
  const experiences = [
    {
      id: 1,
      text: "Participating in the Rampura 25K marathon was a life-changing experience! The event was well-organized, and I loved the community spirit. I can’t wait to join again next year!",
      name: "John D.",
      role: "Marathon Enthusiast",
      image:
        "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 2,
      text: "I was nervous about my first marathon, but the supportive environment made all the difference. Crossing that finish line felt like the best moment of my life!",
      name: "Pat K.",
      role: "First-Time Participant",
      image:
        "https://images.pexels.com/photos/9425183/pexels-photo-9425183.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 3,
      text: "Running in the 'Miles for Smiles' charity marathon was unforgettable. Knowing that my efforts helped underprivileged kids motivated me to keep going!",
      name: "Ali H.",
      role: "Charity Runner",
      image:
        "https://images.pexels.com/photos/22776161/pexels-photo-22776161/free-photo-of-a-man-in-a-polo-shirt-and-sunglasses.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
    {
      id: 4,
      text: "After participating in multiple marathons, I feel healthier and more confident than ever. Training for these events has given me a new purpose and a sense of accomplishment.",
      name: "Konstas P.",
      role: "Fitness Enthusiast",
      image:
        "https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    },
  ];

  return (
    <div
      data-aos="fade-up"
      className="my-12 px-4 flex flex-col gap-10 items-center"
    >
      <h2 className="text-3xl font-bold text-sky-500">User Experience</h2>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {experiences.map(({ id, text, name, role, image }) => (
          <div
            key={id}
            className="bg-slate-300 dark:bg-gray-800 shadow-lg rounded-lg p-6 border border-gray-200"
          >
            <p className="text-gray-600 dark:text-gray-400 italic mb-4">
              "{text}"
            </p>
            <div className="flex gap-2 items-center mb-3">
              <div className="w-7 h-7 rounded-full">
                <img
                  className="h-full w-full object-cover rounded-full"
                  src={image}
                  alt={name}
                />
              </div>
              <h4 className="font-bold text-lg">{name}</h4>
            </div>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserExperience;
