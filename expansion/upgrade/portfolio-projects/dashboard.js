const getProjectCatsCount = require("./models/queries/projectCategory/CountProjectCategories");
const getProjectCount = require("./models/queries/project/CountProjects");
module.exports = {
  name: "Portfolio Projects",
  async theFunction(name, blogCount) {
    let numberOfProjectCats, projectNumber;
    await Promise.all([getProjectCatsCount(), getProjectCount()]).then(
      result => {
        numberOfProjectCats = result[0];
        projectNumber = result[1];
      }
    );
    return `
    <div class="admin-blocks">
    <a href="/admin/portfolio">
        <h5>
            ${name}
        </h5>
        <h4>
            project categories:
        </h4>
        <h5>
            ${numberOfProjectCats}
        </h5>
        <h4>
            number of projects:
        </h4>
        <h5>
            ${projectNumber}
        </h5>
        </a>
    </div>
        `;
  }
};

