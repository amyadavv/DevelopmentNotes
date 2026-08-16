## Things to know in a frontend framework

1. Flex - flex-start, flex-end, center, space-between, space-around
2. Grids
3. Responsiveness
4. background color, text color, hover

By default tailwind uses a mobile-first breakpoint system. What this means is that unprefixed utilities (like 'uppercase') take effect on all screen sizes, while prefixed utilities (like 'md:uppercase') only take effect at the specified breakpoint and above. 

### Responsiveness

sm - 640px  @media (min-width: 640px) {  }
md - 768px  @media (min-width: 640px) {  }
lg - 1024px  @media (min-width: 640px) {  }
xl - 1280px  @media (min-width: 640px) {  }
2xl - 1536px  @media (min-width: 640px) {  }


### Targeting mobile screens 

WHere this approach surprises people most often is that to style something for mobile, you need to use the unprefixed version of a utility, not the 'sm:' prefixed version. Dont think of 'sm:' as meaning 'on small screens', think of it as 'at the small breakpoint'

Don't use 'sm:' to target mobile devices

// this will only center text on screens 640px and wider, not on small screens 
<div class="sm:text-center"></div>

Use unprefixed utilities to target mobiles, and override them at larger breakpoints

// this will center text on mobile, and left align it on screens 640px and wider
<div class="text-center sm:text-left"></div>

<div class="grid grid-cols-12">

<div class="col-span-12 md:col-span-5 bg-red-100">Div 1</div>
<div class="col-span-12 md:col-span-5 bg-green-200">Div 2 </div>
<div class="col-span-12 md:col-span-2 bg-orange-300">Div 2</div>

</div>

# Store token in localStorage

onClick={async () => {
    const response = await axios.post("{url}", { username, firstName, lastName, password });
    localStorage.setItem("token", response.data.token);   // First is key and secound is value
}}

and if you want to remove token from the localStorage then

localStorage.removeItem("token")

- get token

```jsx

axios.get("url", {
    to: id,
    amount
}, {
    headers: {
        Authorization: "Bearer " + localStorage.getItem("token")
    }
})
```

# Navigate to different pages

- react router dom gives us hook which is useNavigate to navigate to different page

Example: 

```jsx
const navigate = useNavigate();
 return 
 <div>
    navigate("/send");
 <div>
 ```

- we can also go to different page using Link tag, which is also given by react router dom

# Get access to query params using react router dom 

```jsx
const [searchParams] = useSearchParams();
const id = searchParams.get("id");
const name = searchParams.get("name");
```

