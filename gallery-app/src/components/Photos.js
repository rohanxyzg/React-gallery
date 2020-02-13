import React , {PureComponent} from 'react';
import Photo from './Photo';
import { withRouter } from 'react-router-dom'
import NoResults from './NoResults';
class Photos extends PureComponent{

    componentDidMount = () => {
        // Lifts App.js state to search for image keyword
        this.props.history.listen(location => this.props.search(location.pathname.replace(/[^\w\s]/gi, '').replace("search", '')));
        this.props.search(this.props.text);
      }

    render(){
        const results = this.props.data;
        let title="";
        let images;
        if(results.length){
            title = this.props.title;
            images = results.map(image => 
                <Photo key={image.id} url={`https://farm${image.farm}.staticflickr.com/${image.server}/${image.id}_${image.secret}.jpg`} />
            );
        }
        else{
            images = <NoResults />
        }


        

        return(
            <div className="photo-container">
                {
                    (this.props.loading)
                    ? <p>Loading....</p>
                    : <div>
                        <h2>{title}</h2>
                        <ul>
                            {images}
                        </ul>
                      </div>
                }
            </div>

        );
    }

}

export default withRouter(Photos);