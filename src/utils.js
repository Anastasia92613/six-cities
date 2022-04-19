// Адаптер для полей объекта массива с предлоэениями
export const adapterData = (data) => {
  const adaptedOffers = data.map((offer) => {
    const cardOffer = {
      ...offer,
      host: {
        avatarUrl: offer.host.avatar_url,
        id: offer.host.id,
        isPro: offer.host.is_pro,
        name: offer.host.name,
      },
      isFavorite: offer.is_favorite,
      isPremium: offer.is_premium,
      maxAdults: offer.max_adults,
      previewImage: offer.preview_image,
    };
    delete cardOffer.host.avatar_url;
    delete cardOffer.host.is_pro;
    delete cardOffer.is_favorite;
    delete cardOffer.is_premium;
    delete cardOffer.max_adults;
    delete cardOffer.preview_image;
    return cardOffer;
  });
  return adaptedOffers;
};

// Адаптер для полей объекта с одним предложением
export const adapterCard = (card) => {
  const offer = {
    ...card,
    host: {
      avatarUrl: card.host,
      id: card.host.id,
      isPro: card.host.is_pro,
      name: card.host.name,
    },
    isFavorite: card.is_favorite,
    isPremium: card.is_premium,
    maxAdults: card.max_adults,
    previewImage: card.preview_image,
  };
  delete offer.host.avatar_url;
  delete offer.host.is_pro;
  delete offer.is_favorite;
  delete offer.is_premium;
  delete offer.max_adults;
  delete offer.preview_image;

  return card ? offer : null;
};

// Адаптер для полей объекта с информацией пользователя
export const adapterUserInfo = (user) => {
  const adapterUser = {
    ...user,
    avatarUrl: user.avatar_url,
    isPro: user.is_pro,
  };
  delete adapterUser.avatar_url;
  delete adapterUser.is_pro;

  return user ? adapterUser : null;
};

// Адаптер для полей объекта с массивом комментариев
export const adapterComments = (comments) => {
  const adaptedComments = comments.map((comment) => {
    const adaptedComment = {
      ...comment,
      user: {
        avatarUrl: comment.user.avatar_url,
        id: comment.user.id,
        isPro: comment.user.is_pro,
        name: comment.user.name,
      },
    };
    delete adaptedComment.user.avatar_url;
    delete adaptedComment.user.is_pro;

    return adaptedComment;
  });
  return comments ? adaptedComments : null;
};

// Преобразование данных для построения точек на карте

export const pointsMap = (array) => array.reduce((offer, newOffer) => {
  const filteredOffer = offer.find((el) => el.city === newOffer.city.name);
  if (filteredOffer) {
    filteredOffer.points.push({
      title: newOffer.title,
      point: {
        id: newOffer.id,
        latitude: newOffer.location.latitude,
        longitude: newOffer.location.longitude,
        zoom: newOffer.location.zoom
      }
    });
  } else {
    offer.push(
        {
          id: offer.length + 1,
          city: newOffer.city.name,
          location: {
            latitude: newOffer.city.location.latitude,
            longitude: newOffer.city.location.longitude,
            zoom: newOffer.city.location.zoom
          },
          points: [{
            title: newOffer.title,
            point: {
              id: newOffer.id,
              latitude: newOffer.location.latitude,
              longitude: newOffer.location.longitude,
              zoom: newOffer.location.zoom
            }
          }]});
  }
  return offer;

}, []);
