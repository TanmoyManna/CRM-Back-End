exports.userResponse = (Users) => {
  const userResult = [];

  Users.forEach((user) => {
    userResult.push({
      name: user.name,
      email: user.email,
      mobileNo: user.mobileNo,
      userType: user.userType,
      userStatus: user.userStatus,
      image: user.image,
      company: user.company,
      responsibility: user.responsibility,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  });

  return userResult;
};
