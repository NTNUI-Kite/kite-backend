//TODO: import dbConnection and replace with actual db-calls

var Blog = {
  getAllPosts: function(callback){
    return(
      {
        posts:[
          {
            title: "Hei og velkommen",
            abstract: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vel sem ut nunc tincidunt auctor. Cras egestas erat non diam consectetur, ut interdum dolor aliquet. Praesent porttitor erat vel sapien semper iaculis. Suspendisse urna ex, tristique ac mollis sed, cursus et dolor. Quisque erat nulla, convallis et ipsum ac, laoreet pellentesque lacus. Sed pulvinar ante nec viverra lacinia. Vestibulum et augue pharetra, congue justo ultricies, lobortis felis. Mauris pretium cursus tempor. Vestibulum fringilla laoreet elit, ut facilisis ex molestie accumsan. Sed congue vitae urna non aliquet. Morbi commodo, leo quis maximus convallis, risus tellus porttitor lorem, a mollis tortor dolor eu justo. Nam vitae efficitur ex. Aliquam ultrices justo sed est dictum, non vestibulum dui dapibus. Phasellus pulvinar id mauris gravida aliquet. Nulla dignissim turpis et erat scelerisque gravida.",
            date: "2014-02-17"
          },
          {
            title: "Hei og velkommen 2",
            abstract: "Etiam lectus ante, sollicitudin sed posuere vitae, accumsan vel sem. Curabitur ligula eros, eleifend nec dictum vel, efficitur quis lorem. Nam odio tortor, posuere id congue eu, semper non urna. Curabitur dapibus elementum tellus vitae posuere. Donec non arcu magna. Pellentesque condimentum scelerisque risus, vitae luctus magna pharetra viverra. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Fusce vitae sem vitae nisi finibus lobortis. Proin in ullamcorper metus. Fusce nunc nulla, tincidunt imperdiet orci eget, venenatis dictum purus. Praesent eget feugiat mi. Ut condimentum turpis vitae enim aliquam accumsan. Vivamus hendrerit dignissim ipsum ut semper. Donec fringilla erat accumsan, dictum nulla at, volutpat sapien.",
            date: "2014-02-17"
          },
        ]
      }
    )
  }
}

module.exports = Blog;
