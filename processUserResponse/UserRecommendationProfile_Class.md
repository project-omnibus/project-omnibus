# UserRecProfile Class

UserRecommendationProfile object is a recommendation profile generated during a single conversation.

## Attributes

user_id - user id for recording recommendations for each user.
date - date the user rec profile was created (typically when the conversation took place).
keyWordList - an array of keywords to search in book database for recommendations. Array can be any length


## JSON Object Definition

For now, it may be simplest to define this "class" as just a JSON object, without class declaration.

```
userRecProfile = {
	user_id: 23,
	date: 1539543705234, //standard for JS Date.now(). Use JS to convert to readable strings.
	keyWordList: ['shoes', 'Nike', 'Phil', 'Knight']
}
```
